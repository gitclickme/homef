"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtCommand = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtCommand {
    static verifyAccessToken(token) {
        const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString() ?? '';
        try {
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecretKey);
            return { success: true, data: decoded };
        }
        catch (error) {
            return { success: false, error: error };
        }
    }
    static generateAccessToken(payload) {
        const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString() ?? '';
        const options = { expiresIn: '1h' };
    }
}
exports.JwtCommand = JwtCommand;
