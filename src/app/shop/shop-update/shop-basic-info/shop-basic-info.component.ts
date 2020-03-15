import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../shop.service';
import * as _ from 'lodash';

@Component({
  selector: 'shop-basic-info',
  templateUrl: './shop-basic-info.html'
})
export class ShopBasicInfoComponent implements OnInit {
  @Input() shop: any;
  public isSubmitted = false;

  constructor(private toasty: ToastyService, private shopService: ShopService) { }

  ngOnInit() { }
  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!');
    }
    const data = _.pick(this.shop, ['name', 'alias', 'address', 'city', 'state', 'country', 'zipcode', 'email',
      'phoneNumber', 'logoId', 'verificationIssueId', 'bannerId', 'headerText', 'gaCode', 'announcement', 'returnAddress']);

    this.shopService.update(this.shop.id, data).then(resp => {
      this.toasty.success('Editarea a fost efectuata cu succes!');
    }).catch((err) =>
      this.toasty.error(err.data.data.message || err.data.data.details[0].message)
    );
  }
  selectLogo(data: any) {
    this.shop.logoId = data._id;
    this.shop.logo = data;
  }
  selectVerificationIssue(data: any) {
    this.shop.verificationIssueId = data._id;
    this.shop.verificationIssue = data;
  }
  selectBanner(data: any) {
    this.shop.bannerId = data._id;
    this.shop.banner = data;
  }
}
