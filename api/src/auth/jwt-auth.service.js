"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    var _a, _b;
    const authHeader = req.headers.token;
    const jwtSecretKey = (_b = (_a = process.env.JWT_SECRET_KEY) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    try {
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.toString(); //&& <string>authHeader.split(' ')[1];
        if (token) {
            const verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
            if (verified) {
                next();
            }
            else {
                // Access Denied
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
    generateAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = { user: '2344' };
                let ret = jwt_auth_1.JwtCommand.generateAccessToken(payload);
                res.type("json").status((0, utils_1.restCodeConverter)(200)).send(ret);
            }
            catch (error) {
                res.type("json").status(501).send(error);
            }
        });
    }
    routeGuard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const authHeader = req.headers.token;
            const jwtSecretKey = (_b = (_a = process.env.JWT_SECRET_KEY) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
            let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
            try {
                const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.toString(); //&& <string>authHeader.split(' ')[1];
                if (token) {
                    const verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
                    if (verified) {
                        return res.send("Successfully Verified");
                    }
                    else {
                        // Access Denied
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
        });
    }
}
exports.JwtAuthService = JwtAuthService;
