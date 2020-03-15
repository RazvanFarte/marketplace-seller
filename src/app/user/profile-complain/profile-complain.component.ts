import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { ToastyService } from 'ng2-toasty';
@Component({
  selector: 'profile-complain',
  templateUrl: './profile-complain.html'
})
export class ProfileComplainComponent implements OnInit {

  public content: String = "";
  constructor(public activeModal: NgbActiveModal, private userService: UserService, private toasty: ToastyService) { }

  ngOnInit() {
  }
  submit() {
    if (this.content === '') {
      return this.toasty.error('Va rugam introduceti textul in casuta pentru plangere.');
    }

    this.userService.complain({ content: this.content }).then((res) => {
      this.toasty.success('Plangerea a fost trimisa!');
    }).catch((err) => {
      this.toasty.error('Ceva nu a mers, va rugam sa incercati din nou!');
    })
    this.activeModal.close();
  }
}
