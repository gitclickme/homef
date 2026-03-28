"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepo = void 0;
const db_1 = require("../config/db");
const MApiRes_1 = require("../../../_model/MApiRes");
class BookRepo {
    async getBookList(assetType, idVendor, idItem, beginDate, endDate) {
        let bookList;
        const queryString = 'CALL bookList';
        const param = [assetType, idVendor, idItem, beginDate, endDate];
        let dataRecord = await (0, db_1.callSP)(queryString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            bookList = data;
        }
        return bookList;
    }
    async bookInput(book) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL bookInput';
        const param = [book.idVendor, book.idType, book.amount, book.operationDate, book.commentText];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret;
    }
    async bookInputUpdate(book) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL bookInputUpdate';
        const param = [book.idOperation, book.idVendor, book.idType, book.amount, book.operationDate, book.commentText];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret;
    }
    async bookInputDelete(idOperation) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL bookInputDelete';
        const param = [idOperation];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            ret.trace.retMsg = data[0]['retMsg'];
        }
        return ret;
    }
    async bookOutput(book) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL bookOutput';
        const param = [book.idVendor, book.idItem, book.idType, book.amount, book.idBudget, book.operationDate, book.commentText];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret;
    }
    async bookOutputUpdate(book) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL bookOutputUpdate';
        const param = [book.idOperation, book.idVendor, book.idItem, book.idType, book.amount, book.idBudget, book.operationDate, book.commentText];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode;
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret;
    }
    async bookOutputDelete(idOperation) {
        let ret = new MApiRes_1.MApiRes();
        const spString = 'CALL bookOutputDelete';
        const param = [idOperation];
        let dataRecord = await (0, db_1.callSP)(spString, param);
        let data = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            ret.trace.retMsg = data[0]['retMsg'];
        }
        return ret;
    }
}
exports.BookRepo = BookRepo;
