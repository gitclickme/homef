import { tableItemManagement } from "./m-table";

export class MInput {
idOperation:number = -1;
amount:number = 0
idVendor:number = -1;
vendorName: string = '';
operationDate:string = '';
idType:number = 1;
commentText:string = '';

tableManagement : tableItemManagement = new tableItemManagement();
}