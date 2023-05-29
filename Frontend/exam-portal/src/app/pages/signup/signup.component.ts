import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { usernameValidator } from '../validators/username.validator';
import { emailValidator } from '../validators/email.validator';
import { phoneNumberValidator } from '../validators/phone.validator';
import { passwordValidator } from '../validators/password.validator';
import { User } from './User';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required, usernameValidator()],
      password: ['', Validators.required, passwordValidator()],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValidator()]],
      phone: ['', Validators.required, phoneNumberValidator()],
    });
  }

  userRegistration() {
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'User Registration Success !!',
          text: 'The registration was successfully registered....',
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong',
        });
      }
    );
  }
}
