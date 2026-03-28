"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MBudget = void 0;
const m_table_1 = require("./m-table");
class MBudget {
    idBudget = -1;
    idItem = -1;
    itemName = '';
    active = 0;
    closed = 0;
    amount = 0;
    balance = 0;
    beginDate = '';
    endDate = '';
    descriptionText = '';
    tableManagement = new m_table_1.tableItemManagement();
}
exports.MBudget = MBudget;
