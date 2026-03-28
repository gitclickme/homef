"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = __importDefault(require("express"));
const item_service_1 = require("../service/item.service");
const item_repo_1 = require("../repo/item.repo");
exports.itemRouter = express_1.default.Router();
const itemService = new item_service_1.ItemService(new item_repo_1.ItemRepo());
const itemPath = '';
exports.itemRouter.route(`${itemPath}/:active`)
    .get(async (req, res) => {
    return await itemService.itemList(req, res);
});
exports.itemRouter.route(`${itemPath}`)
    .post(async (req, res) => {
    return await itemService.itemCreate(req, res);
});
exports.itemRouter.route(`${itemPath}`)
    .put(async (req, res) => {
    return await itemService.itemUpdate(req, res);
});
