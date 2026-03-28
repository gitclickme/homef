"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const { combine, timestamp, printf, colorize, align } = winston_1.format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), align(), logFormat)
        }),
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/combined.log') }),
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/error.log'), level: 'error' })
    ],
    exceptionHandlers: [
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/exceptions.log') })
    ],
    rejectionHandlers: [
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/rejections.log') })
    ]
});
exports.default = logger;
