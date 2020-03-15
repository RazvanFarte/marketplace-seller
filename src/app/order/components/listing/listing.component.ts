import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';

@Component({
  selector: 'order-listing',
  templateUrl: './listing.html'
})
export class ListingComponent implements OnInit {

  public orders = [];
  public page: Number = 1;
  public take: Number = 10;
  public total: Number = 0;
  public searchFields: any = {
    status: ''
  };
  public sortOption: any = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public dateFilter: any = {
    startDate: '',
    toDate: ''
  };
  public accessToken: any = '';

  constructor(private authService: AuthService, private router: Router, private orderService: OrderService, private toasty: ToastyService) {
    this.accessToken = this.authService.getAccessToken();
  }

  ngOnInit() {
    this.query();
  }

  changeUTCDate() {
    if (this.dateFilter.startDate !== '' && this.dateFilter.toDate !== '') {
      const startUTCDate = new moment().utcOffset(0);
      startUTCDate
        .year(this.dateFilter.startDate.year)
        .month(this.dateFilter.startDate.month - 1)
        .date(this.dateFilter.startDate.day);
      this.dateFilter.startDate = startUTCDate.startOf('day').toISOString();

      const toUTCDate = new moment().utcOffset(0);
      toUTCDate
        .year(this.dateFilter.toDate.year)
        .month(this.dateFilter.toDate.month - 1)
        .date(this.dateFilter.toDate.day);
      this.dateFilter.toDate = toUTCDate.startOf('day').toISOString();

      if (startUTCDate > toUTCDate) {
        return 0;
      }
    }
  }

  query() {
    if (this.changeUTCDate() === 0) {
      return this.toasty.error('Data de inceput trebuie sa fie mai mica decat data de sfarsit!');
    }

    const params = Object.assign({
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate
    }, this.searchFields);

    this.orderService.find(params).then((res) => {
      this.orders = res.data.items;
      this.total = res.data.count;
    }).catch(() => this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!'));
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  exportCSV() {
    if (this.changeUTCDate() == 0) {
      return this.toasty.error('Data de inceput trebuie sa fie mai mica decat data de sfarsit!');
    }

    const params = {
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate,
      access_token: this.accessToken
    };

    this.orderService.export(params).then()
      .catch((err) => {
        const link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }
}
