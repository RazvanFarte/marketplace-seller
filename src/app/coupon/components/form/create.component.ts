import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'coupon-create',
  templateUrl: './form.html'
})
export class CouponCreateComponent implements OnInit {

  public isSubmitted: any = false;
  public coupon: any = {
    name: '',
    code: '',
    discountPercentage: 0,
    limit: 0
  };
  public date: any;

  constructor(private router: Router, private couponService: CouponService, private toasty: ToastyService) {
  }

  ngOnInit() {
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (frm.invalid) {
      return this.toasty.error('Formularul este invalid, va rugam incercati din nou.');
    }

    if (this.coupon.discountPercentage < 0 || this.coupon.discountPercentage > 100) {
      return this.toasty.error('Reducerea trebuie sa fie intre 0 si 100');
    }

    if (this.coupon.limit < 0) {
      return this.toasty.error('Limita nu poate fi negativa');
    }

    if (this.date) {
      this.coupon.expiredTime = new Date(this.date.year, this.date.month - 1, this.date.day).toUTCString();
    } else {
      return this.toasty.error('Va rugam selectati data de expirare!');
    }

    this.couponService.create(this.coupon)
      .then(() => {
        this.toasty.success('Cuponul a fost creat');
        this.router.navigate(['/coupons/list']);
      }, err => this.toasty.error(err.data.data.message || 'Ceva nu a mers, va rugam sa incercati din nou!'));
  }
}
