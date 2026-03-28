"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const MApiRes_1 = require("../../../_model/MApiRes");
class ItemService {
    itemRepo;
    constructor(itemRepo) {
        this.itemRepo = itemRepo;
    }
    async itemList(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let active = +req.params.active;
            let itemList = await this.itemRepo.getItemList(active);
            if (itemList) {
                ret.dataList = itemList;
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
    async itemCreate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let item = req.body;
            ret = await this.itemRepo.itemCreate(item);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
    async itemUpdate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let item = req.body;
            ret = await this.itemRepo.itemUpdate(item);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
}
exports.ItemService = ItemService;
