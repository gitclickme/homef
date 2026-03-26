import { callSP} from "../config/db";
import { MApiRes } from "../../../_model/MApiRes";
import { MItem } from "../../../_model/MItem";

export class ItemRepo{
    

    async getItemList(active: number): Promise<MItem[]> {
        let itemList!: MItem[];
        const queryString = 'CALL itemList';
        const param = [active];
        let dataRecord = await callSP(queryString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            itemList = <MItem[]>data;
        }
        return itemList;
    }

    async itemCreate(item: MItem ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL itemCreate';
        const param = [ item.itemName, item.amount, item.idVendorString];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            item.idItem = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = item;
        return ret
    }

    async itemUpdate(item: MItem ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL itemUpdate';
        const param = [item.idItem, item.itemName, item.amount, item.active, item.idVendorString];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            item.idItem = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = item;
        return ret
    }

}