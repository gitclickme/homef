import { Component } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { VendorService } from '../../_service/vendor.service';
import { DialogService } from '../../_share/dialog/dialog.service';
import { AccountService } from '../../_service/account.service';
import { DateTool } from '../../_share/utils/date-tools';
import { MAccount } from '@model/MAccount';
import { MInput } from '@model/MInput';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { BookTypeEnum } from '../../_share/enum/book-type-enum';
import { tableItemManagement } from '@model/m-table';
import { dialogType } from '../../_share/dialog/dialog-enumerator';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InDetailComponent } from './in-detail.component';

@Component({
  selector: 'app-in',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InDetailComponent],
  templateUrl: 'in.component.html',
  styleUrl: 'in.component.css'
})
export class InComponent {

 constructor(private bookService: BookService,
    private dialog: DialogService,
    private vendorService: VendorService,
    private accountService: AccountService,
  ) { }


  inputList: MInput[] = [];
  newInput: MInput = new MInput();

  beginDateForm = new FormControl(DateTool.date2Canonical(DateTool.beginMonthDate(new Date)));
  endDateForm = new FormControl(DateTool.date2Canonical(DateTool.endMonthDate(new Date)));
  accountDataList : MAccount[] = [];

  get beginDate(): string {
    return this.beginDateForm.getRawValue() ?? '';
  }

  get endDate(): string {
    return this.endDateForm.getRawValue() ?? '';
  }

  show = { new: false, formType: FormEnum.edit, total: 0 }
  account = {checking:0, saving:0, balance:0}

  ngOnInit(): void {
    this.createFormControl();
  }

  onFormReturn(event: formCommandEnum) {
    this.show.total = 0;
    switch (event) {
      case formCommandEnum.close:
        this.show.new = false;
        this.inputList.map(item => {
          item.tableManagement.isEditing = false;
          this.show.total += item.amount;
        })
        break;
      case formCommandEnum.create:
      case formCommandEnum.update:
      case formCommandEnum.delete:
        this.show.new = false;
        this.getInputOperationList(this.beginDate, this.endDate);
        break;
    }
  }


  onSelectInput(idOperation: number) {
    this.show.new = false;
    this.show.formType = FormEnum.edit;
    this.inputList.map(item => {
      if (item.idOperation == idOperation) {
        item.tableManagement.isEditing = true;
      }
      else {
        item.tableManagement.isEditing = false;
      }
    })
  }


  onNewInput() {
    this.show.new = true;
    this.show.formType = FormEnum.new;
  }

  getInputOperationList(beginDate: string, endDate: string) {
    this.show.total = 0;
    if (beginDate && endDate) {
      this.bookService.getBookList(BookTypeEnum.input, -1, -1, beginDate, endDate).subscribe({
        next: (ret => {
          if (ret.trace.retCode > 0) {
            this.inputList = ret.dataList;
            this.getAccountData();
            this.inputList.map(item => {
              item.tableManagement = new tableItemManagement()
              this.show.total += item.amount;
            });
          }
          else {
            this.dialog.openDialog({ dialogType: dialogType.alert, dialogMsg: ret.trace.retMsg })
          }
        })
      })
    }

  }

  getAccountData(){
    this.accountService.getAccountList().subscribe({
      next:(ret => {
        if(ret.trace.retCode > 0){
            this.accountDataList = ret.dataList;
            this.account.checking = this.accountDataList.find(item=> item.accountType == 1)?.amount??0;
            this.account.saving = this.accountDataList.find(item=> item.accountType == 2)?.amount??0;
            this.account.balance = this.accountDataList.find(item=> item.accountType == 3)?.amount??0;
        }
      })
    })
  }

  createFormControl() {
    this.beginDateForm.valueChanges.subscribe({
      next: (beginDate => {
        if (beginDate && this.endDate) {
          this.getInputOperationList(beginDate, this.endDate);
        }
      })
    })

    this.endDateForm.valueChanges.subscribe({
      next: (endDate => {
        if (endDate && this.beginDate) {
          this.getInputOperationList(this.beginDate, endDate);
        }
      })
    })

  }



}

