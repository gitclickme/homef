"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MItem = void 0;
const m_table_1 = require("./m-table");
class MItem {
    idItem = -1;
    itemName = '';
    active = 1;
    amount = 0;
    idVendorString = '';
    idVendorNameString = '';
    tableManagement = new m_table_1.tableItemManagement('');
}
exports.MItem = MItem;
