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
        var _a, _b;
        const jwtSecretKey = (_b = (_a = process.env.JWT_SECRET_KEY) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
        try {
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecretKey);
            return { success: true, data: decoded };
        }
        catch (error) {
            return { success: false, error: error };
        }
    }
    static generateAccessToken(payload) {
        var _a, _b;
        const jwtSecretKey = (_b = (_a = process.env.JWT_SECRET_KEY) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
        const options = { expiresIn: '1h' };
    }
}
exports.JwtCommand = JwtCommand;
