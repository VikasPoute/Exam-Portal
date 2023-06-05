import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { usernameValidator } from '../validators/username.validator';
import { emailValidator } from '../validators/email.validator';
import { phoneNumberValidator } from '../validators/phone.validator';
import { passwordValidator } from '../validators/password.validator';
import { User } from './User';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  public user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, usernameValidator()]],
      password: ['', [Validators.required, passwordValidator]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValidator()]],
      phone: ['', [Validators.required, phoneNumberValidator()]],
    });
  }
  userRegistration() {
    if (this.signupForm.valid) {
      this.userService.addUser(this.user).subscribe(
        (data) => {
          console.log(data);
          this.showSuccessSweetAlert('User Registration Success !!');
        },
        (error) => {
          if (error.status === 409) {
            this.showErrorSnackbar('User is already registered with this name.');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'User Registration Failed',
              text: 'Something went wrong',
            });
          }
        }
      );
    } else {
      this.showErrorSweetAlert('Invalid Form. Please fill in all required fields.');
    }
  }

  showSuccessSweetAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  showErrorSweetAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }



}
