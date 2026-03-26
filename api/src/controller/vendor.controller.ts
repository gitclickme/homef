import express from "express";
import { VendorService } from "../service/vendor.service";
import { VendorRepo } from "../repo/vendor.repo";

export const vendorRouter = express.Router();

const vendorService: VendorService = new VendorService(new VendorRepo());
const vendorPath: string = '';


vendorRouter.route(`${vendorPath}/:active`)
.get(async(req, res) => {
   return await vendorService.vendorList(req, res);
})

vendorRouter.route(`${vendorPath}/item/:idItem`)
.get(async(req, res) => {
   return await vendorService.vendorByItemList(req, res);
})

vendorRouter.route(`${vendorPath}/allitem/:idItem`)
.get(async(req, res) => {
   return await vendorService.vendorByItemListAll(req, res);
})


vendorRouter.route(`${vendorPath}`)
.post(async(req, res) => {
    return await vendorService.vendorCreate(req, res);
})


vendorRouter.route(`${vendorPath}/:idVendor`)
.put(async(req, res) => {
    return await vendorService.vendorUpdate(req, res);
})

