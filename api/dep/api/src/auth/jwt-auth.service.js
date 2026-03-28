"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthService = exports.routeGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_auth_1 = require("./jwt-auth");
const utils_1 = require("../shared/utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
4495922;
const routeGuard = (req, res, next) => {
    const authHeader = req.headers.token;
    const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString() ?? '';
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    try {
        const token = authHeader?.toString();
        if (token) {
            const verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
            if (verified) {
                next();
            }
            else {
                return res.type("json").status(401).send('Access Denied');
            }
        }
        else {
            return res.type("json").status(401).send('Access Denied');
        }
    }
    catch (error) {
        return res.status(401).send(error);
    }
};
exports.routeGuard = routeGuard;
class JwtAuthService {
    async generateAccessToken(req, res) {
        try {
            let payload = { user: '2344' };
            let ret = jwt_auth_1.JwtCommand.generateAccessToken(payload);
            res.type("json").status((0, utils_1.restCodeConverter)(200)).send(ret);
        }
        catch (error) {
            res.type("json").status(501).send(error);
        }
    }
    async routeGuard(req, res, next) {
        const authHeader = req.headers.token;
        const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString() ?? '';
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        try {
            const token = authHeader?.toString();
            if (token) {
                const verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
                if (verified) {
                    return res.send("Successfully Verified");
                }
                else {
                    return res.type("json").status(401).send('Access Denied');
                }
            }
            else {
                return res.type("json").status(401).send('Access Denied');
            }
            next();
        }
        catch (error) {
            return res.status(401).send(error);
        }
    }
}
exports.JwtAuthService = JwtAuthService;
