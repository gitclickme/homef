import { callSP} from "../config/db";
import { MApiRes } from "../../../_model/MApiRes";
import { MBudget } from "../../../_model/MBudget";

export class BudgetRepo{
    
    async getBudgetList(searchDate:string, idItem: number): Promise<MBudget[]> {
        let budgetList: MBudget[] = [];
        const spString = 'CALL budgetList';
        const param = [searchDate, idItem];
        let dataRecord =await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            budgetList = <MBudget[]>data;
        }
        return budgetList;
    }


    async budgetCreate(budget: MBudget ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL budgetCreate';
        const param = [ budget.idItem, budget.amount, budget.beginDate, budget.endDate, budget.descriptionText];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            budget.idBudget = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = budget;
        return ret
    }


    async budgetUpdate(budget: MBudget ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL budgetUpdate';
        const param = [ budget.idBudget, budget.idItem, budget.amount, budget.beginDate, budget.endDate, budget.descriptionText];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            budget.idBudget = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = budget;
        return ret
    }

    async budgetFindId(idItem: number, operationDate: string ): Promise<MApiRes> {
        let ret = new MApiRes();
        const queryString = 'CALL budgetFindId';
        const param = [idItem, operationDate];
        let dataRecord = await callSP(queryString, param);
        let data: any[] = dataRecord[0];  
        if (data.length > 0) {
            ret.data = <number>data[0].idBudget;
        }
        return ret;
    }

    async budgetOpen(budgetListString:any): Promise<MApiRes> {
        let ret = new MApiRes();
        const queryString = 'CALL budgetOpen';
        const param = [budgetListString.idBudgetString];
        let dataRecord = await callSP(queryString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = budgetListString;
        return ret;
    }

}