import { Request, Response} from "express";
import { MApiRes } from "../../../_model/MApiRes";
import { MBudget } from "../../../_model/MBudget";
import { BudgetRepo } from "../repo/budget.repo";

export class BudgetService{

       
    constructor(private budgetRepo: BudgetRepo){}

    async budgetList(req: Request, res: Response) {
        let ret: MApiRes = new MApiRes();
        try {
            let searchDate:string = <string> req.query['searchDate']??'';
            let idItem: number = + (req.query['idItem']??-1);
            let budgetList: MBudget[] | null = await this.budgetRepo.getBudgetList(searchDate, idItem);
            if (budgetList) {
                ret.dataList = budgetList;
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


    async budgetCreate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let budget = <MBudget> req.body
            ret = await this.budgetRepo.budgetCreate(budget);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }

    async budgetUpdate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let budget:MBudget = <MBudget> req.body
            ret = await this.budgetRepo.budgetUpdate(budget);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }

    async budgetOpen(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let budgetString = req.body
            ret = await this.budgetRepo.budgetOpen(budgetString);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }

    async budgetFindId(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let idItem = +req.params.idItem;
            let operationDate = req.params.operationDate;
            ret = await this.budgetRepo.budgetFindId(idItem, operationDate);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
}