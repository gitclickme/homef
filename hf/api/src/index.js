"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./config/logger"));
const startServer = () => {
    try {
        const server = app_1.default.listen(config_1.default.port, () => {
            logger_1.default.info(`Server environment:${config_1.default.environment}`);
            logger_1.default.info(`Server environment:${config_1.default.environment}`);
            logger_1.default.info(`Server running on port:${config_1.default.port}/${config_1.default.apiUrl}`);
            logger_1.default.info(`Server DB_Host:${config_1.default.dbConfig.host}`);
            logger_1.default.info(`Server DB:${config_1.default.dbConfig.database}`);
        });
        process.on('unhandledRejection', (err) => {
            logger_1.default.error('UNHANDLED REJECTION', 'UNHANDLED REJECTION! 💥 Shutting down...');
            logger_1.default.error(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });
    }
    catch (err) {
        logger_1.default.error('Server not running', err);
    }
    ;
};
startServer();
