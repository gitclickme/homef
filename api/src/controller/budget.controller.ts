
import express from "express";
import { BudgetService } from "../service/budget.service";
import { BudgetRepo } from "../repo/budget.repo";

export const budgetRouter = express.Router();
const budgetService: BudgetService = new BudgetService(new BudgetRepo());
const budgetPath: string = '';


budgetRouter.route(`${budgetPath}`)
.get(async(req, res) => {
   return await budgetService.budgetList(req, res);
})

budgetRouter.route(`${budgetPath}`)
.post(async(req, res) => {
   return await budgetService.budgetCreate(req, res);
})
.put(async(req, res) => {
   return await budgetService.budgetUpdate(req, res);
})

budgetRouter.route(`${budgetPath}/id/:idItem/:operationDate`)
.get(async(req, res) => {
   return await budgetService.budgetFindId(req, res);
})

budgetRouter.route(`${budgetPath}/open`)
.post(async(req, res) => {
   return await budgetService.budgetOpen(req, res);
})


