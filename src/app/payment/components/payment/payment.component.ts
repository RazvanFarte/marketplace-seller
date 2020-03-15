import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { PaymentService } from '../../services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeService, ElementsOptions, StripeCardComponent } from 'ngx-stripe';
import * as _ from 'lodash';
import { SystemService } from '../../../shared/services';

@Component({
  templateUrl: './payment.html'
})
export class PaymentComponent implements OnInit {

  @Input() packageID: any;
  @Input() packageName: any;
  @Input() packagePrice: any;
  @Input() packageDuration: any;
  public userInfo: any = {};
  public isSubmitted: any = false;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  public cardHolderName: any = '';
  public cardOptions: any = {};
  // optional parameters
  public elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  public stripeTest: FormGroup;
  public stripeToken: any = null;
  public paymentGateway: any;

  constructor(private systemService: SystemService, private paymentService: PaymentService, private toasty: ToastyService,
    private stripeService: StripeService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.systemService.configs().then(res => this.paymentGateway = res.paymentGatewayConfig);
  }

  ngOnInit() {
    this.stripeService.setKey(window.appConfig.stripeKey);
    this.stripeTest = this.fb.group({
      cardName: ['', [Validators.required]]
    });
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (frm.invalid) {
      return this.toasty.error('Va rugam trimiteti un formular valid');
    }

    if (!this.userInfo.paymentMethod) {
      return this.toasty.error('Va rugam sa selectati o modalitate de plata!');
    }

    if (this.userInfo.paymentMethod === 'stripe') {
      const name = this.stripeTest.get('cardName').value;
      if (!name) {
        return this.toasty.error('Va rugam sa introduceti detinatorul cardului!');
      }
      this.stripeService
        .createToken(this.card.getCard(), { name })
        .subscribe(result => {
          if (result.token) {
            // Use the token to create a charge or a customer
            // https://stripe.com/docs/charges
            this.stripeToken = result.token.id;
            this.doPost();
          } else if (result.error) {
            // Error creating the token
            this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!');
          }
        });
    } else {
      this.doPost();
    }
  }

  doPost() {
    if (this.userInfo.paymentMethod === 'paypal') {
      this.paymentService.request({
        gateway: 'paypal',
        service: 'shop-featured',
        itemId: this.packageID
      })
        .then(transactionResp => {
          window.location.href = transactionResp.data.redirectUrl;
        })
        .catch((err) => {
          this.activeModal.close();
          this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!');
        });
    } else if (this.userInfo.paymentMethod === 'stripe') {
      this.paymentService.request({
        gateway: 'stripe',
        service: 'shop-featured',
        itemId: this.packageID,
        stripeToken: this.stripeToken
      })
        .then(res => {
          this.activeModal.close();
          window.location.href = '/payments/success';
        })
        .catch((err) => {
          this.activeModal.close();
          this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!');
        });
    } else {
      this.activeModal.close();
      window.location.href = '/payments/success';
    }
  }
}
