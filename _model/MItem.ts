import { tableItemManagement } from "./m-table";

export class MItem{
  idItem:number = -1;
  itemName: string = '';
  active: number = 1;
  amount: number = 0;

  idVendorString : string = '';
  idVendorNameString : string = '';

  tableManagement: tableItemManagement = new tableItemManagement('');
}