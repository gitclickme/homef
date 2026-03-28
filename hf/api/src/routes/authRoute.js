"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = __importDefault(require("../service/authService"));
const logger_1 = __importDefault(require("../config/logger"));
const validationMiddleware_1 = __importDefault(require("../middleware/validation/validationMiddleware"));
const userSchema_1 = require("../middleware/validation/userSchema");
const createAuthRoutes = () => {
    const router = (0, express_1.Router)();
    router.post('/register', (0, validationMiddleware_1.default)(userSchema_1.registerUserSchema), async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
                res.status(400).json({ message: 'Name, email, and password are required.' });
                return;
            }
            const newUser = await authService_1.default.register({ name, email, password });
            logger_1.default.info(`AuthRoutes: User registration request for email: ${email}`);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        }
        catch (error) {
            logger_1.default.error(`AuthRoutes: Registration error: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    });
    router.post('/login', (0, validationMiddleware_1.default)(userSchema_1.loginUserSchema), async (req, res) => {
        try {
            const { email, password } = req.body;
            if (typeof email !== 'string' || typeof password !== 'string') {
                res.status(400).json({ message: 'email, and password are required.' });
                return;
            }
            const { token, user } = await authService_1.default.login(email, password);
            logger_1.default.info(`AuthRoutes: User login request for email: ${email}`);
            res.json({ token, user });
        }
        catch (error) {
            logger_1.default.error(`AuthRoutes: Login error: ${error.message}`);
            res.status(401).json({ message: error.message });
        }
    });
    return router;
};
exports.default = createAuthRoutes;
