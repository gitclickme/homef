
import { FormBuilder, FormControl, FormGroup, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BudgetService } from '../../_service/budget.service';
import { DialogService } from '../../_share/dialog/dialog.service';
import { ItemService } from '../../_service/item.service';
import { MTable, tableItemManagement } from '@model/m-table';
import { MBudget } from '@model/MBudget';
import { DateTool } from '../../_share/utils/date-tools';
import { MItem } from '@model/MItem';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { dialogCommand, dialogType } from '../../_share/dialog/dialog-enumerator';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetDetailComponent } from './budget-detail.component';
import { ActivePipe, TitleActivePipe, ClosedPipe, titleClosedPipe } from "../../_share/pipe/active.pipe";

@Component({
  selector: 'app-budget',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BudgetDetailComponent, ActivePipe, TitleActivePipe, ClosedPipe, titleClosedPipe],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})

export class BudgetComponent {


  constructor(private budgetService: BudgetService,
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private itemService: ItemService,
  ) { }

  budgetTable: MTable = new MTable();
  budgetList: MBudget[] = [];
  budget: MBudget = new MBudget();

  budgetFormGroup!: FormGroup;
  searchDateForm = new FormControl(DateTool.today().substring(0,7));

  get searchDateSelected():string{
    return this.searchDateForm.getRawValue()??'';
  }

  idItemList: MItem[] = [];
  idItemForm = new FormControl(-1);
  get idItemSelected(): number {
    return this.idItemForm.getRawValue() ?? -1;
  }

  show = { new: false, budgetDetailType: FormEnum.new }
  total = {budget: 0, balance: 0}

  unSubscriber = new Subject();


  ngOnInit(): void {

    this.getIdItemList();
    this.createFormGroup();

    this.searchDateForm.valueChanges.pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (searchDate => {
          this.getBudgetList((searchDate??''), this.idItemSelected);
      })
    });

    this.idItemForm.valueChanges.pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (itemSelected => {
        if (itemSelected) {
          this.getBudgetList(this.searchDateSelected, itemSelected);
        }
      })
    })

    this.getBudgetList(DateTool.today().substring(0,7), -1);

    this.dialog.dialogClickAccepted$.pipe(takeUntil(this.unSubscriber)).subscribe({
      next:(commandClick)=>{
        if(commandClick == dialogCommand.new){
              this.openBudget();
        }
      }
    });
  }

  ngOnDestroy(): void {
      this.unSubscriber.next(0);
  }

  onNewBudget() {
    this.newBudget();
  }

  onActiveBudget() {
    this.dialog.openDialog({dialogType:dialogType.confirm, dialogMsg:'Are you sure?', confirmCommand:dialogCommand.new})
  }

  getBudgetList(searchDate: string, idItem:number) {
    this.checkActive.clear();
    this.total = {budget:0, balance:0};
    searchDate = searchDate==''?'':searchDate+'-01';
      this.budgetService.getBudgetList(searchDate, idItem).subscribe({
      next: (ret => {
        if (ret.trace.retCode > 0) {
          this.budgetList = ret.dataList;
          this.budgetList.map(item => {
            item.tableManagement = new tableItemManagement()
            this.checkActive.push(new FormControl(item.active));
            this.total.budget += item.amount;
            this.total.balance += item.balance;
          });
        }
      })
    })
  }

  getIdItemList() {
    this.itemService.getItemList(1).subscribe({
      next: (ret => {
        if (ret.trace.retCode > 0) {
          this.idItemList = ret.dataList;
        }
      })
    })
  }

  onSelectBudget(idBudget: number) {
    this.show.new = false;
    this.show.budgetDetailType = FormEnum.edit;
    this.budgetList.map(item => {
      if (item.idBudget == idBudget) {
        item.tableManagement.isEditing = true;
        this.budget = item
      }
      else {
        item.tableManagement.isEditing = false
      }
    });
  }

  onBudgetDetailReturn($event: formCommandEnum) {
    this.show.new = false;
    switch ($event) {
      case formCommandEnum.close:
        this.budgetList.map(item => item.tableManagement.isEditing = false);
        break;
      case formCommandEnum.create:
      case formCommandEnum.update:
        this.getBudgetList(this.searchDateSelected, this.idItemSelected);
        break;
    }
  }

  newBudget() {
    this.budget = new MBudget();
    this.budgetList.map(item => item.tableManagement.isEditing = false);
    this.show.new = true;
    this.show.budgetDetailType = FormEnum.new;
  }

  openBudget() {
    let idBudgetListToOpen = '';
    this.budgetFormGroup.value.checkActive
      .map((isChecked: boolean, index: number) => {
        if (isChecked && !this.budgetList[index].active) {
          idBudgetListToOpen += this.budgetList[index].idBudget + '|' + this.budgetList[index].amount + '|' + this.budgetList[index].idItem + ','
        }
      })
    if (idBudgetListToOpen.length > 0) {
      this.budgetService.budgetsOpen(idBudgetListToOpen).subscribe({
        next: (ret => {
          if (ret.trace.retCode > 0) {
            this.dialog.openDialog({ dialogType: dialogType.inform, dialogMsg: ret.trace.retMsg })
            this.getBudgetList(this.searchDateSelected, this.idItemSelected)
          }
          else {
            this.dialog.openDialog({ dialogType: dialogType.alert, dialogMsg: ret.trace.retMsg })
          }
        })
      })
    }
  }

  createFormGroup() {
    this.budgetFormGroup = this.formBuilder.group({
      checkActive: new FormArray([])
    })
  }

  get checkActive() {
    return this.budgetFormGroup.controls['checkActive'] as FormArray;
  }


}

