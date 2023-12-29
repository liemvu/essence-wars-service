
const { google } = require('googleapis');
const { ApiError } = require('../middlewares/errorHandler');



const spreadsheetId = '1Wn6gNfI77vK4Zs8TReQPzS4yUBe9yyEV843QHVJn8cY';

const rangesMap = {
    "warrior": "warrior!B1:P100",
    "archer": "archer!B1:H100"
}

function getServiceAccount() {
    if (process.env.NODE_ENV === 'production') {
        return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    } else {
        return require('../../res/keys/essencewars-409308-ebed1c3b4a4a.json');
    }
}

function tryParseValue(value) {
    let number = Number(value);

    if (isNaN(number)) {
        return value;
    }
    if (number % 1 === 0) {
        return parseInt(value);
    }
    return parseFloat(value);
}

exports.getGameDataByKey = async (req, res, next) => {


    try {
        const {
            key
        } = req.params;

        const range = rangesMap[key];
        if (!range) {
            throw new ApiError(404, 'data_not_found', "No data found for key: " + key);
        }

        // Configure the Google Sheets API.
        const serviceAccount = getServiceAccount();
        const jwtClient = new google.auth.JWT(
            serviceAccount.client_email,
            null,
            serviceAccount.private_key,
            ['https://www.googleapis.com/auth/spreadsheets.readonly']
        );
        await jwtClient.authorize();
        const sheets = google.sheets({ version: 'v4', auth: jwtClient });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        // Convert the Google Sheets data to JSON.
        const rows = response.data.values;
        const keys = rows[0];
        const data = rows.slice(1).map(row => {
            let obj = {};
            keys.forEach((key, i) => {
                let value = row[i];
                obj[key] = tryParseValue(value);
            });
            return obj;
        });

        console.log('rows', data);

        res.json({
            key,
            data,
        });
    } catch (err) {
        next(err);
    }

};
