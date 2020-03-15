import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'coupon-update',
  templateUrl: './form.html'
})
export class CouponUpdateComponent implements OnInit {

  public isSubmitted: boolean = false;
  public coupon: any;
  public date: any = {
    year: '',
    month: '',
    day: ''
  };

  constructor(private router: Router, private couponService: CouponService, private route: ActivatedRoute, private toasty: ToastyService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.couponService.findOne(id).then(resp => {
      this.coupon = resp.data;
      this.date.year = Number(resp.data.expiredTime.substr(0, 4));
      this.date.month = Number(resp.data.expiredTime.substr(5, 2));
      this.date.day = Number(resp.data.expiredTime.substr(8, 2)) + 1;
    });
  }

  submit(frm) {
    this.isSubmitted = true;
    if (frm.$invalid) {
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

    const param = {
      name: this.coupon.name,
      code: this.coupon.code,
      discountPercentage: this.coupon.discountPercentage,
      limit: this.coupon.limit,
      expiredTime: this.coupon.expiredTime
    };

    this.couponService.update(this.coupon._id, param).then(resp => {
      this.toasty.success('Editarea a fost efectuata cu succes.');
    });
  }
}
