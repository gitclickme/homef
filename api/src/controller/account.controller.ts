import express from "express";
import { AccountService } from "../service/account.service";
import { AccountRepo } from "../repo/account.repo";


export const accountRouter = express.Router();
const accountService: AccountService = new AccountService(new AccountRepo());
const accountPath: string = '';


accountRouter.route(`${accountPath}`)
.get(async(req, res) => {
   return await accountService.accountData(req, res);
})