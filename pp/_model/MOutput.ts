import { tableItemManagement } from "./m-table";
import { DateTool } from "../ui/src/app/_share/utils/date-tools";

export class MOutput {
  idOperation:number = -1;
  amount:number = 0.00;
  balance: number = 0;
  idVendor:number = -1;
  vendorName: string = '';
  idItem: number = -1;
  itemName: string = '';
  operationDate:string = DateTool.today();
  idType:number = 2;
  commentText:string = '';
  idBudget: number = -1;

tableManagement! : tableItemManagement;
}

