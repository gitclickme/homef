"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const MApiRes_1 = require("../../../_model/MApiRes");
class VendorService {
    vendorRepo;
    constructor(vendorRepo) {
        this.vendorRepo = vendorRepo;
    }
    async vendorList(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let active = +req.params.active;
            let vendorList = await this.vendorRepo.getVendorList(active);
            if (vendorList) {
                ret.dataList = vendorList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 0936';
            res.type("json").status(200).send(ret);
        }
    }
    async vendorByItemList(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let idItem = +req.params.idItem;
            let vendorList = await this.vendorRepo.getVendorByItemList(idItem);
            if (vendorList) {
                ret.dataList = vendorList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 0501';
            res.type("json").status(200).send(ret);
        }
    }
    async vendorByItemListAll(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let idItem = +req.params.idItem;
            let vendorList = await this.vendorRepo.getVendorByItemListAll(idItem);
            if (vendorList) {
                ret.dataList = vendorList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 0501';
            res.type("json").status(200).send(ret);
        }
    }
    async vendorCreate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let vendor = req.body;
            ret = await this.vendorRepo.vendorCreate(vendor);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
    async vendorUpdate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let idVendor = +req.params.idVendor;
            let vendor = req.body;
            vendor.idVendor = idVendor;
            ret = await this.vendorRepo.vendorUpdate(vendor);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
}
exports.VendorService = VendorService;
