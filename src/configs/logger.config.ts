import * as winston from 'winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

const loggerTransports: winston.transport[] = [];
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  // define new level here
};

/**
 * logs errors into a daily files
 */
loggerTransports.push(
  new transports.DailyRotateFile({
    filename: `logs/error/%DATE%-error.log`,
    level: 'error',
    format: format.combine(format.timestamp(), format.json()),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '30d',
  }),
);

/** logs into cli */
loggerTransports.push(
  new transports.Console({
    format: format.combine(
      format.cli(),
      format.splat(),
      format.timestamp(),
      format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
      }),
    ),
  }),
);

export const loggerOptions: winston.LoggerOptions = {
  transports: loggerTransports,
  levels,
};
