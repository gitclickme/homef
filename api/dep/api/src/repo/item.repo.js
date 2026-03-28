"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepo = void 0;
const db_1 = require("../config/db");
const MApiRes_1 = require("../../../_model/MApiRes");
class ItemRepo {
    async getItemList(active) {
        let itemList;
        const queryString = 'CALL itemList';
        const param = [active];
        let dataRecord = await (0, db_1.callSP)(queryString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            itemList = data;
        }
        return itemList;
    }
    async itemCreate(item) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL itemCreate';
        const param = [item.itemName, item.amount, item.idVendorString];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            item.idItem = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = item;
        return ret;
    }
    async itemUpdate(item) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL itemUpdate';
        const param = [item.idItem, item.itemName, item.amount, item.active, item.idVendorString];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            item.idItem = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = item;
        return ret;
    }
}
exports.ItemRepo = ItemRepo;
