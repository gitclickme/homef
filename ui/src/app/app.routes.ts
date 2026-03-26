import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { ItemComponent } from './back/item/item.component';
import { VendorComponent } from './back/vendor/vendor.component';
import { InComponent } from './operation/in/in.component';
import { OutComponent } from './operation/out/out.component';
import { MainComponent } from './layout/main/main.component';
import { NgModule } from '@angular/core';
import { BudgetComponent } from './operation/budget/budget.component';

export const routes: Routes = [
  {
    path:'#', redirectTo:'', pathMatch:'full'
  },
  {
  path: '',
    component: MainComponent,
    //canActivateChild:[isLogGuardGuard],
    children: [
      {
        path:'item',
        component:ItemComponent,
      },
      {
        path:'budget',
        component:BudgetComponent,
      },
      {
        path: 'vendor',
        component: VendorComponent
      },
       {
        path: 'in',
        component: InComponent
      },
      {
        path: 'out',
        component: OutComponent
      },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})
export class AppRoutingModule { }




