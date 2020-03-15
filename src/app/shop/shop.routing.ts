import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopUpdateComponent } from './shop-update/shop-update.component';

const routes: Routes = [
  {
    path: 'update', component: ShopUpdateComponent,
    data: {
      title: 'Editarea Magazinului',
      urls: [{ title: 'Editarea Magazinului' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
