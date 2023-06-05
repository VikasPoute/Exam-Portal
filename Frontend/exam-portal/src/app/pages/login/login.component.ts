import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { usernameValidator } from '../validators/username.validator';
import { Login } from './Login';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userData!: any;

  public user: Login = new Login();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, usernameValidator()]],
      password: ['', [Validators.required]],
    });


  }

  // set the user to the local storage
  public setUser() {
    this.loginService.setUser(this.userData);
  }

  // Get the current user from the local storage
  public getCurrentUser() {
    this.loginService.getCurrentUser().subscribe(user => {
      this.userData = user;
      this.setUser();
      this.loginService.userLogin();
      console.log(user);

      // Redirect ...ADMIN: Admin Dashboard
      if (this.loginService.getUserRole() == 'ADMIN') {
        this.router.navigate(['/admin-dashboard'])
      }
      // Redirect ...NORMAL: Normal Dashboard

      else if (this.loginService.getUserRole() == 'NORMAL') {
        this.router.navigate(['user-dashboard']);
      } else {
        this.loginService.logOut();
      }
    })
  }

  // User login process
  public userLogin() {
    if (this.loginForm.valid) {
      this.loginService.generateToken(this.user).subscribe(
        (data: any) => {
          console.log(data);

          // Set token into local storage
          this.loginService.setUserLoginToken(data.token);
          this.getCurrentUser();
          this.showSuccessSweetAlert('Login Success!', 'You have successfully logged in.');
        },
        (error) => {
          this.showErrorSnackbar('Invalid credentials. Please check your username and password.');
          console.log(error);
        }
      );
    } else {
      if (this.loginForm.get('username')?.invalid && this.loginForm.get('password')?.invalid) {
        this.showErrorSnackbar('Username and Password are required.');
      } else if (this.loginForm.get('username')?.invalid) {
        this.showErrorSnackbar('Username is required.');
      } else if (this.loginForm.get('password')?.invalid) {
        this.showErrorSnackbar('Password is required.');
      }
    }
  }

  public showSuccessSweetAlert(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
    });
  }

  public showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000, // Set the duration to 2000 milliseconds (2 seconds)
    });
  }
}
