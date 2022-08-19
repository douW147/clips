import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/modal.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authModalId: string = "auth";

  constructor(
    public modal: ModalService,
    public authentication: AuthenticationService,
    public fireAuthentication: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  onLoginRegister(event: Event) {
    event.preventDefault();

    this.modal.toggleIsVisible(this.authModalId);
  }

  async logout(event: Event) {
    event.preventDefault();

    await this.fireAuthentication.signOut();
  }

}
