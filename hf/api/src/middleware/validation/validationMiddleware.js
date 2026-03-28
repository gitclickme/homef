"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../config/logger"));
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: true
        });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            logger_1.default.warn(`Validation Error for ${req.method} ${req.originalUrl}: ${errors.join(', ')}`);
            res.status(400).json({ message: 'Validation failed', errors });
        }
        next();
    };
};
exports.default = validationMiddleware;
