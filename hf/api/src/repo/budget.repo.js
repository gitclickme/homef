"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepo = void 0;
const db_1 = require("../config/db");
const MApiRes_1 = require("../../../_model/MApiRes");
class BudgetRepo {
    async getBudgetList(searchDate, idItem) {
        let budgetList = [];
        const spString = 'CALL budgetList';
        const param = [searchDate, idItem];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            budgetList = data;
        }
        return budgetList;
    }
    async budgetCreate(budget) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL budgetCreate';
        const param = [budget.idItem, budget.amount, budget.beginDate, budget.endDate, budget.descriptionText];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            budget.idBudget = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = budget;
        return ret;
    }
    async budgetUpdate(budget) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL budgetUpdate';
        const param = [budget.idBudget, budget.idItem, budget.amount, budget.beginDate, budget.endDate, budget.descriptionText];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            budget.idBudget = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = budget;
        return ret;
    }
    async budgetFindId(idItem, operationDate) {
        let ret = new MApiRes_1.MApiRes();
        const queryString = 'CALL budgetFindId';
        const param = [idItem, operationDate];
        let dataRecord = await (0, db_1.callSP)(queryString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.data = data[0].idBudget;
        }
        return ret;
    }
    async budgetOpen(budgetListString) {
        let ret = new MApiRes_1.MApiRes();
        const queryString = 'CALL budgetOpen';
        const param = [budgetListString.idBudgetString];
        let dataRecord = await (0, db_1.callSP)(queryString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = budgetListString;
        return ret;
    }
}
exports.BudgetRepo = BudgetRepo;
