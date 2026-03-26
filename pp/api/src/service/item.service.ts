
import { Request, Response} from "express";
import { MApiRes } from "../../../_model/MApiRes";
import { MItem } from "../../../_model/MItem";
import { ItemRepo } from "../repo/item.repo";

export class ItemService{

    constructor(private itemRepo: ItemRepo){}

    async itemList(req: Request, res: Response) {
        let ret: MApiRes = new MApiRes();
        try {
            let active: number = + req.params.active;
            let itemList: MItem[] | null = await this.itemRepo.getItemList(active);
            if (itemList) {
                ret.dataList = itemList;
            }
            else {
                ret.trace.retCode = -1;
                ret.trace.retMsg = 'no data found';
            }
            res.type("json").status(200).send(ret);
        }
        catch (error) {
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1643';
            res.type("json").status(200).send(ret);
        }
    }


    async itemCreate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let item = <MItem> req.body
            ret = await this.itemRepo.itemCreate(item);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }

    async itemUpdate(req: Request, res: Response){
        let ret: MApiRes = new MApiRes();
        try{
            let item:MItem = <MItem> req.body
            ret = await this.itemRepo.itemUpdate(item);
            res.type("json").status(200).send(ret);
        }
        catch(error){
            ret.trace.retCode = -500;
            ret.trace.retMsg = 'unexpectedly error found. 1646';
            res.type("json").status(500).send(ret);
        }
    }
}