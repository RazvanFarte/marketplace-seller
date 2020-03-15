import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { ListingComponent } from './components/listing/listing.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListingComponent,
    data: {
      title: 'Manager de comenzi',
      urls: [{ title: 'Comenzi', url: '/orders/list' }]
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: 'Manager de comenzi',
      urls: [{ title: 'Comenzi', url: '/orders/list' }, { title: 'Detalii', url: '/orders/view/:id' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
