import { callSP} from "../config/db";
import { MApiRes } from "../../../_model/MApiRes";
import { MVendor } from "../../../_model/MVendor";

export class VendorRepo{
    
    
    async getVendorList(active: number): Promise<MVendor[]> {
        let vendorList!: MVendor[];
        const queryString = 'CALL vendorList';
        const param = [active];
        let dataRecord = await callSP(queryString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            vendorList = <MVendor[]>data;
        }
        return vendorList;
    }

    async getVendorByItemList(idItem: number): Promise<MVendor[]> {
        let vendorList!: MVendor[];
        const queryString = 'CALL vendorByItemList';
        const param = [idItem];
        let dataRecord = await callSP(queryString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            vendorList = <MVendor[]>data;
        }
        return vendorList;
    }

    async getVendorByItemListAll(idItem: number): Promise<MVendor[]> {
        let vendorList!: MVendor[];
        const queryString = 'CALL vendorByItemListAll';
        const param = [idItem];
        let dataRecord = await callSP(queryString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            vendorList = <MVendor[]>data;
        }
        return vendorList;
    }

  
    async vendorCreate(vendor: MVendor ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL vendorCreate';
        const param = [ vendor.vendorName, vendor.vendorType];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            vendor.idVendor = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = vendor;
        return ret
    }

    async vendorUpdate(vendor: MVendor ): Promise<MApiRes> {
        let ret = new MApiRes();
        const spString = 'CALL vendorUpdate';
        const param = [vendor.idVendor, vendor.vendorName, vendor.vendorType, vendor.active];
        let dataRecord = await callSP(spString, param);
        let data: any[] = dataRecord[0];
        if (data.length > 0) {
            ret.trace.retCode = data[0]['retCode'];
            vendor.idVendor = ret.trace.retCode
            ret.trace.retMsg = data[0]['retMsg'];
        }
        ret.data = vendor;
        return ret
    }

   

}