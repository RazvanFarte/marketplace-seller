import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'shop-review',
  templateUrl: './review.html'
})
export class ShopReviewComponent implements OnInit {

  @Input() shopId: string = "";
  public reviews = [];
  public page: number = 1;
  public take: number = 5;
  public total: any;

  constructor(private router: Router, private reviewService: ReviewService, private toasty: ToastyService) {

  }

  ngOnInit() {
    this.query();
  }

  query() {
    const params = {
      shopId: this.shopId,
      page: this.page,
      take: this.take,
      type: 'shop'
    };
    this.reviewService.find(params).then((res) => {
      this.reviews = res.data.items;
      this.total = res.data.count;
    })
      .catch(() => this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!'));
  }
}
