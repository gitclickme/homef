
import { Request, Response} from "express";
import { MApiRes } from "../../../_model/MApiRes";
import { VendorRepo } from "../repo/vendor.repo";
import { MVendor } from "../../../_model/MVendor";

export class VendorService{

    constructor(private vendorRepo: VendorRepo){}

    async vendorList(req: Request, res: Response) {
        let ret: MApiRes = new MApiRes();
        try {
            let active: number = + req.params.active;
            let vendorList: MVendor[] | null = await this.vendorRepo.getVendorList(active);
            if (vendorList) {
                ret.dataList = vendorList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 0936';
            res.type("json").status(200).send(ret);
        }
    }

    async vendorByItemList(req: Request, res: Response) {
        let ret: MApiRes = new MApiRes();
        try {
            let idItem: number = + req.params.idItem;
            let vendorList: MVendor[] | null = await this.vendorRepo.getVendorByItemList(idItem);
            if (vendorList) {
                ret.dataList = vendorList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 0501';
            res.type("json").status(200).send(ret);
        }
    }

    async vendorByItemListAll(req: Request, res: Response) {
        let ret: MApiRes = new MApiRes();
        try {
            let idItem: number = + req.params.idItem;
            let vendorList: MVendor[] | null = await this.vendorRepo.getVendorByItemListAll(idItem);
            if (vendorList) {
                ret.dataList = vendorList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 0501';
            res.type("json").status(200).send(ret);
        }
    }
    

    async vendorCreate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let vendor = <MVendor> req.body
            ret = await this.vendorRepo.vendorCreate(vendor);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }

    async vendorUpdate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let idVendor = + req.params.idVendor;
            let vendor:MVendor = <MVendor> req.body
            vendor.idVendor = idVendor;
            ret = await this.vendorRepo.vendorUpdate(vendor);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }

}