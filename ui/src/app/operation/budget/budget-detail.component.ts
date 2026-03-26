import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BudgetService } from '../../_service/budget.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../_share/dialog/dialog.service';
import { MBudget } from '@model/MBudget';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { dialogType } from '../../_share/dialog/dialog-enumerator';
import { ItemService } from '../../_service/item.service';
import { CommonModule } from '@angular/common';
import { MItem } from '@model/MItem';

@Component({
  selector: 'app-budget-detail',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetDetailComponent {

constructor(private budgetService: BudgetService,
    private itemService: ItemService,
    private formBuilder : FormBuilder,
    private dialog: DialogService,
  ){}


  @Input() formType:FormEnum = FormEnum.new;
  @Input() budget: MBudget = new MBudget();
  @Output() ret = new EventEmitter();

  itemList: MItem[] = [];
  budgetFormGroup!: FormGroup;
  show = {new: true}

 ngOnInit(): void {
     this.getItemList();
     this.show.new = this.formType == FormEnum.new;
     this.createForm();
 }

 onCreateBudget(){
  this.budgetCreate();
 }

 onUpdateBudget(){
    this.budgetUpdate();
 }

 onCancel(){
  this.ret.emit(formCommandEnum.close);
 }

  getItemList(){
    this.itemService.getItemList(1).subscribe({
      next:(ret => {
        if(ret.trace.retCode > 0){
          this.itemList = ret.dataList;
        }
      })
    })
  }



  budgetCreate(){
    Object.assign(this.budget, this.getBudgetFormRawValues());
    this.budgetService.budgetCreate(this.budget).subscribe({
      next:(ret => {
        if(ret.trace.retCode > 0){
          this.dialog.openDialog({dialogType:dialogType.inform, dialogMsg: ret.trace.retMsg});
          this.ret.emit(formCommandEnum.create);
        }
        else{
          this.dialog.openDialog({dialogType:dialogType.alert, dialogMsg: ret.trace.retMsg});
        }
      })
    })
  }

  budgetUpdate(){
    Object.assign(this.budget, this.getBudgetFormRawValues());
    this.budgetService.budgetUpdate(this.budget).subscribe({
      next:(ret => {
        if(ret.trace.retCode > 0){
          this.dialog.openDialog({dialogType:dialogType.inform, dialogMsg: ret.trace.retMsg});
          this.ret.emit(formCommandEnum.update);
        }
        else{
          this.dialog.openDialog({dialogType:dialogType.alert, dialogMsg: ret.trace.retMsg});
        }
      })
    })
  }

  createForm(){
    this.budgetFormGroup = this.formBuilder.group({
      idItem : [this.budget.idItem, [Validators.required]],
      beginDate:[this.budget.beginDate,[Validators.required]],
      endDate:[this.budget.endDate,[Validators.required]],
      amount:[this.budget.amount.toFixed(2),[Validators.required]],
      descriptionText:[this.budget.descriptionText]
  })

  this.budgetFormGroup.controls['idItem'].valueChanges.subscribe({
    next:(idItem => {
      this.budgetFormGroup.controls['amount'].setValue(this.itemList.find(item=>item.idItem == idItem)?.amount.toFixed(2)??0.00);
    })
  })
  }

  getBudgetFormRawValues(): MBudget{
    let budget: MBudget = this.budgetFormGroup.getRawValue();
    budget.amount = + budget.amount;
    budget.idItem = + budget.idItem;
    return budget;
  }
}

