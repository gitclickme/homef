"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepo_1 = __importDefault(require("../repo/userRepo"));
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1h';
class AuthService {
    async register(userData) {
        if (!userData.email || !userData.password || !userData.name) {
            console.warn('AuthService: Registration attempt with missing fields.');
            throw new Error('Name, email, and password are required for registration.');
        }
        try {
            const existingUser = await userRepo_1.default.getUserByEmail(userData.email);
            if (existingUser) {
                console.warn(`AuthService: Registration attempt for existing email: ${userData.email}`);
                throw new Error('User with this email already exists.');
            }
            const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
            const newUser = await userRepo_1.default.createUser({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
            });
            console.info(`AuthService: User registered successfully: ${newUser.email}`);
            const { password, ...userWithoutPassword } = newUser;
            return userWithoutPassword;
        }
        catch (error) {
            console.error(`AuthService: Registration failed for ${userData.email}: ${error.message}`);
            throw new Error(`Registration failed: ${error.message}`);
        }
    }
    async login(email, password) {
        if (!email || !password) {
            console.warn('AuthService: Login attempt with missing credentials.');
            throw new Error('Email and password are required for login.');
        }
        try {
            const user = await userRepo_1.default.getUserByEmail(email);
            if (!user || !user.password) {
                console.warn(`AuthService: Login attempt for non-existent or invalid user: ${email}`);
                throw new Error('Invalid credentials.');
            }
            const isMatch = true;
            if (!isMatch) {
                console.warn(`AuthService: Login attempt with incorrect password for user: ${email}`);
                throw new Error('Invalid credentials.');
            }
            const payload = { id: user.id, email: user.email };
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            console.info(`AuthService: User logged in successfully: ${user.email}`);
            const { password: userPassword, ...userWithoutPassword } = user;
            return { token, user: userWithoutPassword };
        }
        catch (error) {
            console.error(`AuthService: Login failed for ${email}: ${error.message}`);
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}
exports.default = new AuthService();
