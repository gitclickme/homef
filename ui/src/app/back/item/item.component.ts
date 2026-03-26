import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../_service/item.service';
import { MTable, tableItemManagement } from '@model/m-table';
import { MItem } from '@model/MItem';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { ItemDetailComponent } from "./item-detail.component";
import { CommonModule } from '@angular/common';
import { ActivePipe } from "../../_share/pipe/active.pipe";

@Component({
  selector: 'app-item',
  imports: [CommonModule, ItemDetailComponent, ActivePipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{

 constructor(private itemService: ItemService) {}

 itemTable: MTable = new MTable();
  itemList: MItem[] = [];
  show = { new: false, formType: FormEnum.edit, total:0 };
  newItem: MItem = new MItem();

    ngOnInit(): void {
    this.getItemList();
  }

  onFormReturn(event: formCommandEnum) {
    switch (event) {
      case formCommandEnum.close:
        this.show.new = false;
        this.itemList.map(item => item.tableManagement.isEditing = false);
        break;

      case formCommandEnum.create:
      case formCommandEnum.update:
        this.show.new = false;
        this.getItemList();
        break;
    }
  }

  onAddClick() {
    this.show.new = true;
    this.show.formType = FormEnum.new;
    this.itemList.map(item => item.tableManagement.isEditing = false);
  }

  onItemSelectClick(idItem: number) {
    this.show.formType = FormEnum.edit;
    this.show.new = false;
    this.itemList.map((item) => {
      item.idItem == idItem ? item.tableManagement.isEditing = true : item.tableManagement.isEditing = false;
    });
  }

  getItemList() {
    this.show.total = 0;
    this.itemService.getItemList(-1).subscribe({
      next: (ret => {
        if (ret.trace.retCode > 0) {
          this.itemList = ret.dataList
          this.itemList.map((item: MItem) => {
            item.tableManagement = new tableItemManagement('')
            this.show.total += item.amount;
            });

          if (this.itemList.length == 0) {
            this.show.formType = FormEnum.new;
          }
        }
      })
    })
  }



}
