import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './component/listing.component';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
    data: {
      title: 'Manager de rambursari',
      urls: [{ title: 'Comenzi', url: '/orders/list' }, { title: 'Rambursare' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundRoutingModule { }
