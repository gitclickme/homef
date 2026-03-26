
import express from "express";
import { ItemService } from "../service/item.service";
import { ItemRepo } from "../repo/item.repo";

export const itemRouter = express.Router();
const itemService: ItemService = new ItemService(new ItemRepo());
const itemPath: string = '';


itemRouter.route(`${itemPath}/:active`)
.get(async(req, res) => {
   return await itemService.itemList(req, res);
})


itemRouter.route(`${itemPath}`)
.post(async(req, res) => {
    return await itemService.itemCreate(req, res);
})


itemRouter.route(`${itemPath}`)
.put(async(req, res) => {
    return await itemService.itemUpdate(req, res);
})