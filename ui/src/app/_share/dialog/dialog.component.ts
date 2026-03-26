import { Component, OnInit } from '@angular/core';
import { Dialog } from './idialog';
import { Subscription } from 'rxjs';
import { DialogService } from './dialog.service';
import { dialogType } from './dialog-enumerator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{
showModalBackDropClass: string = 'dialog-modal-backdrop fade hide-modal';
  showModalClass: string = 'dialog-modal dialog-modal-w fade hide-modal';

  dialogData: Dialog = new Dialog();

  dialogSubscription!: Subscription;


  constructor(private dialogService: DialogService) { }

  ngOnInit() {

    this.dialogSubscription = this.dialogService.dialogStatusChanged$.subscribe((status) => {
      if (status === 'open') {
        this.dialogData = this.dialogService.getDialogData();
        this.openDialog();
      }
      else {
        this.closeDialog();
      }
    })
  }

  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }


  openDialog() {
    this.showModalBackDropClass = 'dialog-modal-backdrop fade show show-modal';
    this.showModalClass = 'dialog-modal dialog-modal-w fade show show-modal';
    if (this.dialogData?.dialogType == dialogType.inform) {
      setTimeout(() => this.closeDialog(), 1000);
    }
  }



  closeDialog() {
    this.dialogData.dialogMsg = '';
    this.dialogData.dialogType = dialogType.inform;
    this.showModalBackDropClass = 'dialog-modal-backdrop fade hide-modal';
    this.showModalClass = 'dialog-modal dialog-modal-w fade hide-modal';
  }

  //trigger a new
  clickAcceptConfirm() {
    if (this.dialogData.confirmCommand) {
      this.dialogService.dialogClickAccepted(this.dialogData.confirmCommand);
      this.closeDialog();
    }
  }
}
