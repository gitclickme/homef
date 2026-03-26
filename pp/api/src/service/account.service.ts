import { Request, Response} from "express";
import { MApiRes } from "../../../_model/MApiRes";
import { MAccount } from "../../../_model/MAccount";
import { AccountRepo } from "../repo/account.repo";

export class AccountService{

    constructor(private accountRepo: AccountRepo){}

    async accountData(req: Request, res: Response) {
        let ret: MApiRes = new MApiRes();
        try {
            let accountData: MAccount[] | null = await this.accountRepo.getAccountData();
            if (accountData) {
                ret.dataList = accountData;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1617';
            res.type("json").status(200).send(ret);
        }
    }

}