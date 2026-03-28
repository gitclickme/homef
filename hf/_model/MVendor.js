"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MVendor = void 0;
const m_table_1 = require("./m-table");
class MVendor {
    idVendor = -1;
    vendorName = '';
    active = 1;
    vendorType = 1;
    idItemString = '';
    idItemNameString = '';
    tableManagement = new m_table_1.tableItemManagement();
    isCheck = 0;
}
exports.MVendor = MVendor;
