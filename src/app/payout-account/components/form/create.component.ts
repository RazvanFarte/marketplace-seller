import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'account-create',
  templateUrl: './form.html'
})
export class AccountCreateComponent implements OnInit {

  public isSubmitted: boolean = false;
  public account: any = {
    type: 'bank-account',
    paypalAccount: '',
    accountHolderName: '',
    accountNumber: '',
    iban: '',
    bankName: '',
    bankAddress: '',
    sortCode: '',
    routingNumber: '',
    swiftCode: '',
    ifscCode: '',
    routingCode: ''
  };

  constructor(private router: Router, private accountService: AccountService, private toasty: ToastyService) {
  }

  ngOnInit() {
  }

  submit(frm: any) {
    this.isSubmitted = true;
    console.log(frm);
    if (frm.invalid) {
      return this.toasty.error('Formularul este invalid, va rugam incercati din nou.');
    }

    if (this.account.type === 'paypal' && this.account.paypalAccount == '') {
      return this.toasty.error('Daca ati selectat Paypal ca modalitate de plata, va rugam sa introduceti contul de Paypal!');
    }

    this.accountService.create(this.account)
      .then(() => {
        this.toasty.success('Contul a fost creat');
        this.router.navigate(['/accounts/list']);
      }, err => this.toasty.error(err.data.data.message || 'Ceva nu a mers, va rugam sa incercati din nou!'));
  }
}
