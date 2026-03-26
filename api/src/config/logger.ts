// File: src/config/logger.ts
import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize, align } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info', // Minimum level to log
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Console transport
    new transports.Console({
      format: combine(
        colorize(), // Add colors to console output
        align(),    // Align log messages
        logFormat
      )
    }),
    // File transport for all logs
     new transports.File({ filename: path.join(__dirname, '../../logs/combined.log') }),
    // File transport for error logs only
      new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(__dirname, '../../logs/exceptions.log') })
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(__dirname, '../../logs/rejections.log') })
  ]
});

export default logger;
