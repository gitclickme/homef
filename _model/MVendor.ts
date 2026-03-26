import { tableItemManagement } from "./m-table";

export class MVendor{
    
  idVendor:number = -1;
  vendorName: string = '';
  active: number = 1;
  vendorType: number = 1;

  idItemString : string = '';
  idItemNameString : string = '';

  tableManagement : tableItemManagement = new tableItemManagement();
  isCheck: number = 0;
}