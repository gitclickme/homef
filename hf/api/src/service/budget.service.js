"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetService = void 0;
const MApiRes_1 = require("../../../_model/MApiRes");
class BudgetService {
    budgetRepo;
    constructor(budgetRepo) {
        this.budgetRepo = budgetRepo;
    }
    async budgetList(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let searchDate = req.query['searchDate'] ?? '';
            let idItem = +(req.query['idItem'] ?? -1);
            let budgetList = await this.budgetRepo.getBudgetList(searchDate, idItem);
            if (budgetList) {
                ret.dataList = budgetList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1643';
            res.type("json").status(200).send(ret);
        }
    }
    async budgetCreate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let budget = req.body;
            ret = await this.budgetRepo.budgetCreate(budget);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
    async budgetUpdate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let budget = req.body;
            ret = await this.budgetRepo.budgetUpdate(budget);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
    async budgetOpen(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let budgetString = req.body;
            ret = await this.budgetRepo.budgetOpen(budgetString);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
    async budgetFindId(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let idItem = +req.params.idItem;
            let operationDate = req.params.operationDate;
            ret = await this.budgetRepo.budgetFindId(idItem, operationDate);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
}
exports.BudgetService = BudgetService;
