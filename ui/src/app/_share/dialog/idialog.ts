import { dialogCommand, dialogType } from "./dialog-enumerator";

export class Dialog{

  dialogMsg:string = '';
  dialogType:dialogType = dialogType.inform;
  confirmCommand?:dialogCommand ;
}
