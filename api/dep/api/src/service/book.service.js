"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const MApiRes_1 = require("../../../_model/MApiRes");
class BookService {
    bookRepo;
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    async bookList(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let operationType = +req.params.operationType;
            let beginDate = req.params.beginDate;
            let endDate = req.params.endDate;
            let idItem = +req.params.idItem;
            let idVendor = +req.params.idVendor;
            let bookList = await this.bookRepo.getBookList(operationType, idVendor, idItem, beginDate, endDate);
            if (bookList) {
                ret.dataList = bookList;
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
    async bookInput(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let item = req.body;
            ret = await this.bookRepo.bookInput(item);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 900';
            res.type("json").status(500).send(ret);
        }
    }
    async bookInputUpdate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let item = req.body;
            ret = await this.bookRepo.bookInputUpdate(item);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 902';
            res.type("json").status(500).send(ret);
        }
    }
    async bookInputDelete(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let idOperation = +req.params.idOperation;
            ret = await this.bookRepo.bookInputDelete(idOperation);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 902';
            res.type("json").status(500).send(ret);
        }
    }
    async bookOutput(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let item = req.body;
            ret = await this.bookRepo.bookOutput(item);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 901';
            res.type("json").status(500).send(ret);
        }
    }
    async bookOutputDelete(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let idOperation = +req.params.idOperation;
            ret = await this.bookRepo.bookOutputDelete(idOperation);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 901';
            res.type("json").status(500).send(ret);
        }
    }
    async bookOutputUpdate(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let item = req.body;
            ret = await this.bookRepo.bookOutputUpdate(item);
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 901';
            res.type("json").status(500).send(ret);
        }
    }
}
exports.BookService = BookService;
