import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ProfileValidator {

    constructor() {
    }
}

export function pastReviewDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!control.value) {
            return null;
        }
        const dob: Date = new Date(control.value);

        const presentDate: Date = new Date();

        if (dob) {
            const isDateValid = (presentDate.getTime() - dob.getTime() > 0);
            return isDateValid ? null : {invalidDOB: true};
        }
    };
}
