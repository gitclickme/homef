import { Injectable } from '@angular/core';
import { Dialog } from './idialog';
import { Subject } from 'rxjs';
import { dialogCommand } from './dialog-enumerator';

@Injectable({
  providedIn: 'root'
})
export class DialogService {


  private dialogData!: Dialog;

  private dialogStatus = new Subject<string | null>();
  dialogStatusChanged$ = this.dialogStatus.asObservable();


  openDialog(dialog:Dialog){
    this.dialogData = dialog;
    this.dialogStatus.next('open');
  }

  closeDialog(dialog:Dialog){
    this.dialogData = dialog;
    this.dialogStatus.next('close');
  }

  getDialogData(): Dialog{
    return this.dialogData;
  }

  private commandSend = new Subject<dialogCommand |null>();
  dialogClickAccepted$ = this.commandSend.asObservable();


  dialogClickAccepted(commandClick:dialogCommand):void{
    this.commandSend.next(commandClick);
  }


}
