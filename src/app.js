
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const gameDataRoutes = require('./routes/gameDataRoutes');
const { errorHandleMiddleware } = require('./middlewares/errorHandler');
const { loggerMiddleware } = require('./middlewares/logger');
const app = express();

function setupEnvironmentVariables() {
  // Load base environment variables
  dotenv.config({ path: './.env' });
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: './.env.production' });
  } else {
    dotenv.config({ path: './.env.development' });
  }
}

function setupLogging() {
  app.use(loggerMiddleware())
}

function setupExpress() {
  app.use(cors()); // Enable CORS for all origins
  app.use(express.json());
  app.use('/game-data', gameDataRoutes);

  // error handle middleware at bottom
  app.use(errorHandleMiddleware);

  app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
  });

}

setupEnvironmentVariables();
setupLogging();
setupExpress();

module.exports = app; // for testing