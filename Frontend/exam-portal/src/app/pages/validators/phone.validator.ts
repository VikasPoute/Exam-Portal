import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberRegex = /^\+?\d{1,3}[-. ]?\(?\d{1,3}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/; // Regex pattern for phone number validation

    const valid = phoneNumberRegex.test(control.value);

    return valid ? null : { invalidPhoneNumber: true };
  };
}
