"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const MApiRes_1 = require("../../../_model/MApiRes");
class AccountService {
    accountRepo;
    constructor(accountRepo) {
        this.accountRepo = accountRepo;
    }
    async accountData(req, res) {
        let ret = new MApiRes_1.MApiRes();
        try {
            let accountData = await this.accountRepo.getAccountData();
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
exports.AccountService = AccountService;
