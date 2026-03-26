import { callSP, callSPNoParam } from "../config/db";
import { MAccount } from "../../../_model/MAccount";


export class AccountRepo{
    
       
    async getAccountData(): Promise<MAccount[]> {
        let accountList!: MAccount[];
        const queryString = 'CALL accountData()';
        let dataRecord = await callSPNoParam(queryString);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            accountList = <MAccount[]>data;
        }
        return accountList;
    }

  
}