
const { google } = require('googleapis');

// Load the service account key JSON file.
const serviceAccount = require('../res/essencewars-409308-9a1b8e468a56.json');

// Configure the Google Sheets API.
const sheets = google.sheets({ version: 'v4', auth: serviceAccount });

const spreadsheetId = '1Wn6gNfI77vK4Zs8TReQPzS4yUBe9yyEV843QHVJn8cY';

const rangesMap = {
    "warrior": "warrior!B2:P41"
}

exports.getGameDataByKey = async (req, res) => {
    const {
        key
    } = req.params;


    // const spreadsheetId = 'your-spreadsheet-id';
    // const range = 'Sheet1!A1:E5'; // replace with your range

    // try {
    //   const response = await sheets.spreadsheets.values.get({
    //     spreadsheetId,
    //     range,
    //   });

    //   // Convert the Google Sheets data to JSON.
    //   const rows = response.data.values;
    //   const json = rows.map((row) => ({
    //     col1: row[0],
    //     col2: row[1],
    //     // Add more columns as needed.
    //   }));

    //   res.json({
    //     key,
    //     data: json,
    //   });
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send('Failed to fetch data from Google Sheets');
    // }

    res.json({
        key,
    });
};
