import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  alertMessage: string = "Logging...";
  alertColor: string = "blue";
  showAlert: boolean = false;
  inSubmition: boolean = false;

  constructor(private authentication: AngularFireAuth) {

  }

  async submitLogin() {
    this.showAlert = true;
    this.alertMessage = "Logging...";
    this.alertColor = "blue";
    this.inSubmition = true;

    try {
      await this.authentication.signInWithEmailAndPassword(
        this.credentials.email, 
        this.credentials.password
      );

      this.inSubmition = false;
      this.alertMessage = "Successfully logged in";
      this.alertColor = "green";

    } catch(error) {
      console.error(error);

      this.inSubmition = false;
      this.alertMessage = "Something went wrong";
      this.alertColor = "red";

      return 
    }  
  }

}
