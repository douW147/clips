import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AsyncValidator, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class EmailValidator implements AsyncValidator {
    constructor(private authentication: AngularFireAuth) {

    }

    validate = (control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return this.authentication.fetchSignInMethodsForEmail(control.value).then(
            response => response.length ? {emailTaken: true} : null
        )
    }
}
