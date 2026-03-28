"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepo = void 0;
const db_1 = require("../config/db");
class AccountRepo {
    async getAccountData() {
        let accountList;
        const queryString = 'CALL accountData()';
        let dataRecord = await (0, db_1.callSPNoParam)(queryString);
        let data = dataRecord[0];
        if (data.length > 0) {
            accountList = data;
        }
        return accountList;
    }
}
exports.AccountRepo = AccountRepo;
