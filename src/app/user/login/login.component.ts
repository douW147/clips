import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Credentials } from 'src/app/models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: Credentials = {
    email: "",
    password: ""
  }

  alertMessage: string = "Successfully logged in";
  alertColor: string = "blue";
  showAlert: boolean = false;

  submitLogin() {
    this.alertMessage = "Successfully logged in";
    this.alertColor = "blue";
    this.showAlert = true;
  }

}
