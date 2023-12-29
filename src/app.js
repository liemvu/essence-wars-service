
const dotenv = require('dotenv');
const express = require('express');
const gameDataRoutes = require('./routes/gameDataRoutes');
const { errorHandleMiddleware } = require('./middlewares/errorHandler');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

// Load base environment variables
dotenv.config({ path: './.env' });
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' });
} else {
  dotenv.config({ path: './.env.development' });
}






// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

if (process.env.NODE_ENV === 'production') {
  // Use morgan to log to a file in production
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  // Log to the console in development
  app.use(morgan('dev'));
}

app.use(express.json());


app.use('/game-data', gameDataRoutes);

// error handle middleware at bottom
app.use(errorHandleMiddleware);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app; // for testing