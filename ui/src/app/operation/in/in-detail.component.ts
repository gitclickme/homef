import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MInput } from '@model/MInput';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { dialogType } from '../../_share/dialog/dialog-enumerator';
import { MVendor } from '@model/MVendor';
import { VendorTypeEnum } from '../../_share/enum/vendor-type-enum';
import { VendorService } from '../../_service/vendor.service';
import { DialogService } from '../../_share/dialog/dialog.service';
import { BookService } from '../../_service/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-in-detail',
  imports: [CommonModule , FormsModule, ReactiveFormsModule],
  templateUrl: './in-detail.component.html',
  styleUrl: './in.component.css'
})
export class InDetailComponent {

 constructor( private bookService: BookService,
    private dialog: DialogService,
    private vendorService: VendorService,
    private formBuilder: FormBuilder,
  ){}

@Input() in: MInput = new MInput();
@Input() formType: FormEnum = FormEnum.new;
@Output() formRet = new EventEmitter();
inputVendorList: MVendor[] = [];
inputFormGroup! : FormGroup;

show={new: this.formType == FormEnum.new}

ngOnInit(): void {
  this.show.new = this.formType == FormEnum.new;
  this.getInputVendorList();
  this.createInputFormGroup();

}

onCreateClick(){
  this.createInput();
}

onUpdateClick(){
  this.updateInput();
}

onDeleteClick(){
  this.deleteInput(this.in.idOperation);
}

onCloseClick(){
  this.formRet.emit(formCommandEnum.close);
}



getInputVendorList(){
  this.vendorService.getVendorList(1).subscribe({
    next:(ret =>{
      if(ret.trace.retCode> 0){
          this.inputVendorList = ret.dataList.filter((item:MVendor) => item.vendorType == VendorTypeEnum.input);
        }
      else{
        this.dialog.openDialog({dialogType:dialogType.alert, dialogMsg: ret.trace.retMsg})
        this.inputVendorList = [];
      }
    })
  })
  }

  createInput(){
     Object.assign(this.in, this.getInputRawValue());
     this.bookService.bookInput(this.in).subscribe({
      next:(ret=>{
        if(ret.trace.retCode){
          this.dialog.openDialog({dialogType:dialogType.inform, dialogMsg:ret.trace.retMsg});
          this.formRet.emit(formCommandEnum.create);
        }
        else{
          this.dialog.openDialog({dialogType:dialogType.alert, dialogMsg:ret.trace.retMsg});
        }
      })
     })
  }

  updateInput(){
    Object.assign(this.in, this.getInputRawValue());
    this.bookService.bookInputUpdate(this.in).subscribe({
     next:(ret=>{
       if(ret.trace.retCode){
         this.dialog.openDialog({dialogType:dialogType.inform, dialogMsg:ret.trace.retMsg});
         this.formRet.emit(formCommandEnum.update);
       }
       else{
         this.dialog.openDialog({dialogType:dialogType.alert, dialogMsg:ret.trace.retMsg});
       }
     })
    })
 }

 deleteInput(idOperation: number){
  this.bookService.bookInputDelete(idOperation).subscribe({
    next:(ret=>{
      if(ret.trace.retCode){
        this.dialog.openDialog({dialogType:dialogType.inform, dialogMsg:ret.trace.retMsg});
        this.formRet.emit(formCommandEnum.delete);
      }
    })
  })
 }

createInputFormGroup(){
this.inputFormGroup = this.formBuilder.group({
  idVendor:[this.in.idVendor,[Validators.required]],
  operationDate:[this.in.operationDate, Validators.required],
  amount: [this.in.amount.toFixed(2), [Validators.required]],
  commentText:[this.in.commentText]
})
}

getInputRawValue(): MInput{
  let input: MInput = new MInput();
  input = this.inputFormGroup.getRawValue();
  input.amount = + input.amount;
  input.idVendor = +input.idVendor;
  input.commentText = input.commentText??''.trim();
  return input;
}

}

