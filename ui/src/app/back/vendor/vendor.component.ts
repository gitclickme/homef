import { Component } from '@angular/core';
import { VendorTypePipe } from "../../_share/pipe/vendor-type.pipe";
import { ActivePipe } from "../../_share/pipe/active.pipe";
import { VendorService } from '../../_service/vendor.service';
import { MTable, tableItemManagement } from '@model/m-table';
import { MVendor } from '@model/MVendor';
import { formCommandEnum, FormEnum } from '../../_share/enum/form-enum';
import { CommonModule } from '@angular/common';
import { VendorDetailComponent } from "./vendor-detail.component";

@Component({
  selector: 'app-vendor',
  imports: [CommonModule, VendorTypePipe, ActivePipe, VendorDetailComponent],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {

  constructor(private vendorService: VendorService) {}

  vendorTable: MTable = new MTable();
  vendorList: MVendor[] = [];
  vendor : MVendor = new MVendor();
  show = { new: false, formType:FormEnum.new};



ngOnInit(): void {
    this.getVendorList();
}

  onSelectVendor(idVendor: number) {
    this.selectVendor(idVendor);
  }

  onNewVendor() {
    this.newVendor();
    this.show.formType = FormEnum.new;
   }

   onVendorFormReturn(event: formCommandEnum){
       switch(event){
        case formCommandEnum.close:
          this.show.new = false;
          this.vendorList.map(item => item.tableManagement.isEditing = false);
          break;
        case formCommandEnum.create:
        case formCommandEnum.update:
          this.show.new = false;
          this.getVendorList();
          break;
       }
   }

   getVendorList() {
    this.vendorService.getVendorList(-1).subscribe({
      next: (ret => {
        if (ret.trace.retCode > 0) {
          this.vendorList = ret.dataList;
          this.vendorList.map(vendor => vendor.tableManagement = new tableItemManagement());
        }
      })
    })
  }

  selectVendor(idVendor: number) {
    this.show.new = false;
    this.show.formType = FormEnum.edit;
    this.vendorList.map(vendor => {
      if (vendor.idVendor == idVendor) {
        vendor.tableManagement.isEditing = true;
      }
      else {
        vendor.tableManagement.isEditing = false;
      }
    })
  }


  newVendor() {
    this.show.new = true;
    this.vendor = new MVendor();
  }


}
