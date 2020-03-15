import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponCreateComponent } from './components/form/create.component';
import { CouponUpdateComponent } from './components/form/update.component';
import { CouponsComponent } from './components/listing/listing.component';

const routes: Routes = [
  {
    path: 'list',
    component: CouponsComponent,
    data: {
      title: 'Manager de cupoane',
      urls: [{ title: 'Cupoane', url: '/coupons/list' }]
    }
  },
  {
    path: 'create',
    component: CouponCreateComponent,
    data: {
      title: 'Manager de cupoane',
      urls: [{ title: 'Cupoane', url: '/coupons/list' }, { title: 'Creare', url: '/coupons/create' }]
    }
  },
  {
    path: 'update/:id',
    component: CouponUpdateComponent,
    data: {
      title: 'Manager de cupoane',
      urls: [{ title: 'Cupoane', url: '/coupons/list' }, { title: 'Editare', url: '/coupons/update' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
