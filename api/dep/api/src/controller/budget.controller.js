"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetRouter = void 0;
const express_1 = __importDefault(require("express"));
const budget_service_1 = require("../service/budget.service");
const budget_repo_1 = require("../repo/budget.repo");
exports.budgetRouter = express_1.default.Router();
const budgetService = new budget_service_1.BudgetService(new budget_repo_1.BudgetRepo());
const budgetPath = '';
exports.budgetRouter.route(`${budgetPath}`)
    .get(async (req, res) => {
    return await budgetService.budgetList(req, res);
});
exports.budgetRouter.route(`${budgetPath}`)
    .post(async (req, res) => {
    return await budgetService.budgetCreate(req, res);
})
    .put(async (req, res) => {
    return await budgetService.budgetUpdate(req, res);
});
exports.budgetRouter.route(`${budgetPath}/id/:idItem/:operationDate`)
    .get(async (req, res) => {
    return await budgetService.budgetFindId(req, res);
});
exports.budgetRouter.route(`${budgetPath}/open`)
    .post(async (req, res) => {
    return await budgetService.budgetOpen(req, res);
});
