
const morgan = require('morgan');
const winston = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, label, printf } = winston.format;


const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'essence-wars-service' },
  transports: [
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.DailyRotateFile({
      filename: 'application-%DATE%.log',
      dirname: './logs',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d'
    })
  ],
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

class MyStream {
  write(line) {
    logger.info(line);
  }
}

exports.loggerMiddleware = function () {
  let format = "combined";
  if (process.env.NODE_ENV !== 'production') {
    format = 'dev';
  }

  let writer = new MyStream();
  return morgan('combined', { stream: writer });
}

exports.logger = logger;