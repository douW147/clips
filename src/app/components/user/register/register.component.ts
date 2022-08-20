import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';

import { User } from 'src/app/models/user.model';

import { PasswordVaidator } from '../formValidators/match-vaidator';
import { EmailValidator } from '../formValidators/email-validator'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authentication: AuthenticationService,
    private emailValidator: EmailValidator
    ) {
     
  }

  showAlert: boolean = false;
  alertColor: string = "blue";
  alertMessage: string = "Your account is being created";
  inSubmition: boolean = false;


  name = new FormControl("", [
    Validators.required,
    Validators.minLength(2),
  ]);
  email = new FormControl("", [
    Validators.required,
    Validators.email
  ], [this.emailValidator.validate]);
  password = new FormControl("", [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirmPassword = new FormControl("", [
    Validators.required
  ]);
  phoneNumber = new FormControl("", [
    Validators.required,
    Validators.min(11),
  ]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(3)
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
    age: this.age,
  }, [PasswordVaidator.match("password", "confirmPassword")]);

  async submitRegister() {
    this.showAlert = true;
    this.inSubmition = true;
    this.alertColor = "blue";
    this.alertMessage = "Your account is being created";

    try {
      await this.authentication.createUser(this.registerForm.value as User);
    } catch (error) {
      console.error(error);

      this.alertMessage = "Something went wrong. Try again later";
      this.alertColor = "red";
      this.inSubmition = false;

      return
    }

    this.alertMessage = "Succesfuly registered";
    this.alertColor = "green";
    this.inSubmition = false;
  }

}
