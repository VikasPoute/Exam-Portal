import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user: User = new User();

  registerForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    username: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  userRegistration() {
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'User Registration Success !!',
          text:'The registration was successfully registered....'
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The User Name is already in use',
        });
      }
    );
  }
}
