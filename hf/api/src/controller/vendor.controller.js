"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRouter = void 0;
const express_1 = __importDefault(require("express"));
const vendor_service_1 = require("../service/vendor.service");
const vendor_repo_1 = require("../repo/vendor.repo");
exports.vendorRouter = express_1.default.Router();
const vendorService = new vendor_service_1.VendorService(new vendor_repo_1.VendorRepo());
const vendorPath = '';
exports.vendorRouter.route(`${vendorPath}/:active`)
    .get(async (req, res) => {
    return await vendorService.vendorList(req, res);
});
exports.vendorRouter.route(`${vendorPath}/item/:idItem`)
    .get(async (req, res) => {
    return await vendorService.vendorByItemList(req, res);
});
exports.vendorRouter.route(`${vendorPath}/allitem/:idItem`)
    .get(async (req, res) => {
    return await vendorService.vendorByItemListAll(req, res);
});
exports.vendorRouter.route(`${vendorPath}`)
    .post(async (req, res) => {
    return await vendorService.vendorCreate(req, res);
});
exports.vendorRouter.route(`${vendorPath}/:idVendor`)
    .put(async (req, res) => {
    return await vendorService.vendorUpdate(req, res);
});
