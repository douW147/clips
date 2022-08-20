import {ValidationErrors, AbstractControl, ValidatorFn} from "@angular/forms"

export class PasswordVaidator {
    static match(controlName: string, controlConfirmField: string): ValidatorFn  {
        return (group: AbstractControl): ValidationErrors | null => {
            const controlField = group.get(controlName);
            const controlFieldConfirmation = group.get(controlConfirmField);
    
            if(!controlField || ! controlFieldConfirmation) {
                console.error("There are no such fields or field")
                return { controlNotFound: false}
            }
    
            if(controlField.value !== controlFieldConfirmation.value) {
                controlFieldConfirmation.setErrors({ noMatch: true});
                return { noMatch: true}
            }
    
            controlFieldConfirmation.setErrors(null);
            return null;
        } 
    }
}
