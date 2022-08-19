import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private auth: AngularFireAuth,
    private database: AngularFirestore
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

  async submitRegister() {
    this.showAlert = true;
    this.inSubmition = true;
    this.alertColor = "blue";
    this.alertMessage = "Your account is being created";

    const {email, password} = this.registerForm.value;

    try {
      const userCredentials = await this.auth.createUserWithEmailAndPassword(email as string, password as string);
      
      await this.database.collection('users').add({
        name: this.name.value,
        email: this.email.value,
        age: this.age.value,
        phoneNumber: this.phoneNumber.value,
      })
    } catch (error) {
      console.error(error);

      this.alertMessage = "Something went wrong. Try again later";
      this.alertColor = "red";
      this.inSubmition = false;

      return
    }

    this.alertMessage = "Succesfuly registered";
    this.alertColor = "green";
    
  }

}
