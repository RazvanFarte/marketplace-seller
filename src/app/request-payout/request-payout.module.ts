import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { ListingComponent } from './component/listing.component';
import { CreateRequestPayoutComponent } from './component/create.component';

import { RequestPayoutService } from './request-payout.service';

const routes: Routes = [{
  path: '',
  component: ListingComponent,
  data: {
    title: 'Manager de cereri de plata',
    urls: [{ title: 'Cereri de plata', url: '/requestPayout' }]
  }
}, {
  path: 'create',
  component: CreateRequestPayoutComponent,
  data: {
    title: 'Cerere noua',
    urls: [{ title: 'Cereri de plata', url: '/requestPayout' }, { title: 'Cerere noua' }]
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [
    ListingComponent,
    CreateRequestPayoutComponent
  ],
  providers: [RequestPayoutService],
  exports: []
})
export class RequestPayoutModule { }
