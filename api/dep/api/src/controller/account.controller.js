"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const account_service_1 = require("../service/account.service");
const account_repo_1 = require("../repo/account.repo");
exports.accountRouter = express_1.default.Router();
const accountService = new account_service_1.AccountService(new account_repo_1.AccountRepo());
const accountPath = '';
exports.accountRouter.route(`${accountPath}`)
    .get(async (req, res) => {
    return await accountService.accountData(req, res);
});
