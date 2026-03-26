import { Request, Response} from "express";
import { MApiRes } from "../../../_model/MApiRes";
import { MBook } from "../../../_model/MBook";
import { BookRepo } from "../repo/book.repo";


export class BookService{

    constructor(private bookRepo: BookRepo){}

    async bookList(req: Request, res: Response) {
        let ret: MApiRes = new MApiRes();
        try {
            let operationType: number = + req.params.operationType;
            let beginDate: string = req.params.beginDate;
            let endDate: string = req.params.endDate;
            let idItem: number = + req.params.idItem;
            let idVendor: number = + req.params.idVendor;

            let bookList: MBook[] | null = await this.bookRepo.getBookList(operationType, idVendor, idItem, beginDate, endDate);
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

    async bookInput(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let item = <MBook> req.body
            ret = await this.bookRepo.bookInput(item);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 900';
            res.type("json").status(500).send(ret);
        }
    }

    async bookInputUpdate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let item = <MBook> req.body
            ret = await this.bookRepo.bookInputUpdate(item);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 902';
            res.type("json").status(500).send(ret);
        }
    }

    async bookInputDelete(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let idOperation = +req.params.idOperation
            ret = await this.bookRepo.bookInputDelete(idOperation);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 902';
            res.type("json").status(500).send(ret);
        }
    }

    async bookOutput(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let item : MBook = <MBook> req.body
            ret = await this.bookRepo.bookOutput(item);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 901';
            res.type("json").status(500).send(ret);
        }
    }

    async bookOutputDelete(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let idOperation = +req.params.idOperation
            ret = await this.bookRepo.bookOutputDelete(idOperation);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 901';
            res.type("json").status(500).send(ret);
        }
    }

    async bookOutputUpdate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let item: MBook = <MBook> req.body;
            ret = await this.bookRepo.bookOutputUpdate(item);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 901';
            res.type("json").status(500).send(ret);
        }
    }

   


    
}