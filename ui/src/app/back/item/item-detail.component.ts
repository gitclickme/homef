import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemService } from '../../_service/item.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../_share/dialog/dialog.service';
import { VendorService } from '../../_service/vendor.service';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { MItem } from '@model/MItem';
import { MVendor } from '@model/MVendor';
import { dialogType } from '../../_share/dialog/dialog-enumerator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item.component.css'
})
export class ItemDetailComponent {

  constructor(private itemService: ItemService,
    private formBuilder : FormBuilder,
    private dialog: DialogService,
    private vendorService: VendorService,
  ){}

  @Input() item:MItem = new MItem();
  @Input() formType: FormEnum = FormEnum.new;
  @Output() formRet = new EventEmitter();

  itemFormGroup! : FormGroup;
  vendorList: MVendor[] = [];
  show ={new: true}

ngOnInit(): void {
    this.show.new = this.formType == FormEnum.new;
    this.createItemFormGroup();
  }

  onCreateClick(){
    this.createItem();
  }

  onUpdateClick(){
    this.updateItem();
  }

  onCloseClick(){
    this.formRet.emit(formCommandEnum.close);
  }

  onDeleteClick(){}


  getVendorList(){
    this.vendorService.getVendorByItemListAll(this.item.idItem).subscribe({
      next:(ret=> {
        if(ret.trace.retCode > 0){
          this.vendorList = ret.dataList;
          this.vendorListCheckListCreate();
        }
      })
    })
  }

  createItem(){
    Object.assign(this.item, this.getItemRawValue());
    this.itemService.itemCreate(this.item).subscribe({
      next:(ret => {
        if (ret.trace.retCode > 0){
          this.dialog.openDialog({dialogType: dialogType.inform, dialogMsg:ret.trace.retMsg});
          this.formRet.emit(formCommandEnum.create);
        }
        else{
          this.dialog.openDialog({dialogType: dialogType.alert, dialogMsg:ret.trace.retMsg});
        }
      })
    })
  }

  updateItem(){
    Object.assign(this.item, this.getItemRawValue());
    this.itemService.itemUpdate(this.item).subscribe({
      next:(ret => {
        if (ret.trace.retCode > 0){
          this.dialog.openDialog({dialogType: dialogType.inform, dialogMsg:ret.trace.retMsg});
          this.formRet.emit(formCommandEnum.update);
        }
        else{
          this.dialog.openDialog({dialogType: dialogType.alert, dialogMsg:ret.trace.retMsg});
        }
      })
    })
  }

  deleteItem(){

  }

  createItemFormGroup(){
    this.itemFormGroup = this.formBuilder.group({
      itemName:[this.item.itemName, [Validators.required]],
      active: [this.item.active],
      amount:[this.item.amount],
      vendorList: new FormArray([]),
    })
    this.getVendorList();
  }

  get vendorListCheckArray() {
    return this.itemFormGroup.controls['vendorList'] as FormArray;
  }

  vendorListCheckListCreate() {
     this.vendorList.forEach((item) => this.vendorListCheckArray.push(new FormControl(item.isCheck == 1)));
  }


  getItemRawValue(): MItem{
    let item = new MItem();
    item = this.itemFormGroup.getRawValue();
    item.active = + item.active;
    item.amount = + item.amount;

    item.idVendorString = this.itemFormGroup.value.vendorList
      .map((checked: boolean, i: number) => checked ? this.vendorList[i].idVendor : null)
      .filter((v: number) => v !== null).toString()+',';

    return item;
  }


}
