import { AbstractControl, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Regex pattern for alphanumeric characters and underscores

    const valid = usernameRegex.test(control.value);

    return valid ? null : { invalidUsername: true };
  };
}
