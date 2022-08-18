import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  showAlert: boolean = false;
  alertColor: string = "blue";
  alertMessage: string = "Your account is being created";

  name = new FormControl("", [
    Validators.required,
    Validators.minLength(2),
  ]);
  email = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
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
  age = new FormControl("", [
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
  });

  submitRegister() {
    this.showAlert = true;
    this.alertColor = "blue";
    this.alertMessage = "Your account is being created";
  }

}
