import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authModalId: string = "auth";

  constructor(public modal: ModalService) { }

  ngOnInit(): void {
  }

  onLoginRegister(event: Event) {
    event.preventDefault();

    this.modal.toggleIsVisible(this.authModalId);
  }

}