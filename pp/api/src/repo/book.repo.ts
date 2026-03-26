import { callSP} from "../config/db";
import { MBook } from "../../../_model/MBook";
import { MApiRes } from "../../../_model/MApiRes";

export class BookRepo{
    

    async getBookList(assetType: number, idVendor: number, idItem:number, beginDate: string, endDate: string): Promise<MBook[]> {
        let bookList!: MBook[];
        const queryString = 'CALL bookList';
        const param = [assetType, idVendor, idItem, beginDate, endDate];
        let dataRecord = await callSP(queryString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            bookList = <MBook[]>data;
        }
        return bookList;
    }

    async bookInput(book: MBook ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL bookInput';
        const param = [ book.idVendor, book.idType, book.amount, book.operationDate, book. commentText];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret
    }

    async bookInputUpdate(book: MBook ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL bookInputUpdate';
        const param = [book.idOperation, book.idVendor, book.idType, book.amount, book.operationDate, book. commentText];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret
    }

    async bookInputDelete(idOperation: number ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL bookInputDelete';
        const param = [idOperation];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            ret.trace.retMsg = data[0]['retMsg'];
        }
        return ret
    }

    

    async bookOutput(book: MBook ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL bookOutput';
        const param = [book.idVendor, book.idItem, book.idType, book.amount, book.idBudget, book.operationDate, book.commentText];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret
    }

    async bookOutputUpdate(book: MBook ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL bookOutputUpdate';
        const param = [book.idOperation, book.idVendor, book.idItem, book.idType, book.amount, book.idBudget, book.operationDate, book.commentText];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            book.idOperation = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = book;
        return ret
    }

    async bookOutputDelete(idOperation: number ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL bookOutputDelete';
        const param = [idOperation];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            ret.trace.retMsg = data[0]['retMsg'];
        }
        return ret
    }

}