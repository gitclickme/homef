import { tableItemManagement } from "./m-table";

export class MBudget{
idBudget: number = -1;
  idItem: number = -1;
  itemName: string = '';
  active:number = 0;
  closed: number = 0;
  amount:number = 0;
  balance: number = 0;
  beginDate: string = ''
  endDate: string = '';
  descriptionText: string = '';

  tableManagement : tableItemManagement = new tableItemManagement();
    
}