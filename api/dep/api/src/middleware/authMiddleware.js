"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../config/logger"));
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key';
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        logger_1.default.warn('AuthMiddleware: No Authorization header provided.');
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    if (!token) {
        logger_1.default.warn('AuthMiddleware: No token found in Authorization header.');
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        logger_1.default.info(`AuthMiddleware: Token verified for user ID: ${decoded.id}`);
        next();
    }
    catch (error) {
        logger_1.default.error(`AuthMiddleware: Token verification failed: ${error.message}`);
        res.status(401).json({ message: 'Token is not valid' });
        return;
        ;
    }
};
exports.default = authMiddleware;
