import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreateComponent } from './components/form/create.component';
import { AccountUpdateComponent } from './components/form/update.component';
import { AccountsComponent } from './components/listing/listing.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    data: {
      title: 'Manager de conturi',
      urls: [{ title: 'Conturi', url: '/payout/account' }]
    }
  },
  {
    path: 'create',
    component: AccountCreateComponent,
    data: {
      title: 'Manager de conturi',
      urls: [{ title: 'Conturi', url: '/payout/account' }, { title: 'Creare', url: '/payout/account/create' }]
    }
  },
  {
    path: 'update/:id',
    component: AccountUpdateComponent,
    data: {
      title: 'Manager de conturi',
      urls: [{ title: 'Conturi', url: '/payout/account' }, { title: 'Editare', url: '/payout/account/update' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
