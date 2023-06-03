import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from '../signup/User';
import { passwordValidator } from '../validators/password.validator';
import { usernameValidator } from '../validators/username.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
    });
  }

  userLogin() {

  }
}
