import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorService } from '../../_service/vendor.service';
import { DialogService } from '../../_share/dialog/dialog.service';
import { MVendor } from '@model/MVendor';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { dialogType } from '../../_share/dialog/dialog-enumerator';

@Component({
  selector: 'app-vendor-detail',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorDetailComponent {
  constructor(private vendorService: VendorService,
              private formBuilder: FormBuilder,
              private dialogService: DialogService
  ){}

@Input() vendor: MVendor = new MVendor();
@Input() formType : FormEnum = FormEnum.new;
@Output() ret = new EventEmitter();

vendorFormGroup!: FormGroup;
show ={new:true};

OnInit(): void {
    this.show.new = this.formType == FormEnum.new;
    this.createVendorForm();
}

onCancel(){
  this.ret.emit(formCommandEnum.close);
}

onVendorCreate(){
  this.createVendor();
}

onVendorUpdate(){
  this.updateVendor();
}

onVendorDelete(){}

createVendor(){
  Object.assign(this.vendor, this.getVendorRawValues());
  this.vendorService.vendorCreate(this.vendor).subscribe({
    next:(ret=>{
      if(ret.trace.retCode > 0){
        this.dialogService.openDialog({dialogType:dialogType.inform, dialogMsg:ret.trace.retMsg});
        this.ret.emit(formCommandEnum.create);
      }
      else{
        this.dialogService.openDialog({dialogType:dialogType.alert, dialogMsg:ret.trace.retMsg});
      }
    })
  })
}

updateVendor(){
  Object.assign(this.vendor, this.getVendorRawValues());
  this.vendorService.vendorUpdate(this.vendor).subscribe({
    next:(ret=>{
      if(ret.trace.retCode > 0){
        this.dialogService.openDialog({dialogType:dialogType.inform, dialogMsg:ret.trace.retMsg});
        this.ret.emit(formCommandEnum.create);

      }
      else{
        this.dialogService.openDialog({dialogType:dialogType.alert, dialogMsg:ret.trace.retMsg});
      }
    })
  })
}

createVendorForm(){
  this.vendorFormGroup =  this.formBuilder.group({
    vendorName:[this.vendor.vendorName, Validators.required],
    vendorType:[this.vendor.vendorType.toString(), [Validators.required, Validators.min(0)]],
    active:[this.vendor.active]
  })
}


getVendorRawValues():MVendor{
  let vendor : MVendor = this.vendorFormGroup.getRawValue();
  vendor.active = +vendor.active;
  vendor.vendorType = +vendor.vendorType
  return vendor;
}



}
