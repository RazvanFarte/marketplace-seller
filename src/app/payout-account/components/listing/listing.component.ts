import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { UtilService } from '../../../shared/services';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'account-listing',
  templateUrl: './listing.html'
})
export class AccountsComponent implements OnInit {

  public isLoading = false;
  public accounts = [];
  public page: Number = 1;
  public take: Number = 10;
  public total: Number = 0;
  public searchType: any = '';
  public sortOption: any = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toasty: ToastyService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.query();
  }

  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    const params = {
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      type: this.searchType,
    };

    this.accountService.find(params).then((res) => {
      this.accounts = res.data.items;
      this.total = res.data.count;
      this.utilService.setLoading(false);
      this.isLoading = false;
    }).catch(() => {
      this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!');
      this.utilService.setLoading(false);
      this.isLoading = false;
    });
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
  }

  remove(itemId: any, index: number) {
    if (window.confirm('Sunteti sigur ca vreti sa stergeti acest item?')) {
      this.accountService.remove(itemId)
        .then(() => {
          this.toasty.success('Item-ul a fost sters!');
          this.accounts.splice(index, 1);
        })
        .catch((err) => this.toasty.error(err.data.message || 'Ceva nu a mers, va rugam sa incercati din nou!'));
    }
  }
}
