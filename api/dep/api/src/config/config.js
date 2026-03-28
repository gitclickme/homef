"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigEnv = void 0;
require("dotenv/config");
const logger_1 = __importDefault(require("./logger"));
logger_1.default.info(`Reading env, ${process.env.ENVIRONMENT}`);
exports.ConfigEnv = {
    environment: process.env.ENVIRONMENT,
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL || '',
    apiUrl: process.env.URL,
    jwtSecret: process.env.JWT_SECRET || '',
    dbConfig: {
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || ''
    },
};
exports.default = exports.ConfigEnv;
