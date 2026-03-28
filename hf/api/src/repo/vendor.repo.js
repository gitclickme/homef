"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRepo = void 0;
const db_1 = require("../config/db");
const MApiRes_1 = require("../../../_model/MApiRes");
class VendorRepo {
    async getVendorList(active) {
        let vendorList;
        const queryString = 'CALL vendorList';
        const param = [active];
        let dataRecord = await (0, db_1.callSP)(queryString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            vendorList = data;
        }
        return vendorList;
    }
    async getVendorByItemList(idItem) {
        let vendorList;
        const queryString = 'CALL vendorByItemList';
        const param = [idItem];
        let dataRecord = await (0, db_1.callSP)(queryString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            vendorList = data;
        }
        return vendorList;
    }
    async getVendorByItemListAll(idItem) {
        let vendorList;
        const queryString = 'CALL vendorByItemListAll';
        const param = [idItem];
        let dataRecord = await (0, db_1.callSP)(queryString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            vendorList = data;
        }
        return vendorList;
    }
    async vendorCreate(vendor) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL vendorCreate';
        const param = [vendor.vendorName, vendor.vendorType];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            vendor.idVendor = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = vendor;
        return ret;
    }
    async vendorUpdate(vendor) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL vendorUpdate';
        const param = [vendor.idVendor, vendor.vendorName, vendor.vendorType, vendor.active];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            vendor.idVendor = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = vendor;
        return ret;
    }
}
exports.VendorRepo = VendorRepo;
