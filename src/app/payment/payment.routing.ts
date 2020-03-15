import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentUpgradeComponent } from './components/payment-upgrade/upgrade.component';
import { PaymentHistoryComponent } from './components/payment-history/history.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

const routes: Routes = [
  {
    path: 'history',
    component: PaymentHistoryComponent,
    data: {
      title: 'Istoria Platilor',
      urls: [{ title: 'Plati', url: '/payments/history' }, { title: 'Istoria Platilor' }]
    }
  },
  {
    path: 'upgrade',
    component: PaymentUpgradeComponent,
    data: {
      title: 'Promovarea Contului',
      urls: [{ title: 'Plati', url: '/payments/history' }, { title: 'Promovarea Contului' }]
    }
  },
  {
    path: 'success',
    component: PaymentSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
