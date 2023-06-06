import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

export interface TableData {
  left: string;
  right: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any = [];

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log(this.user);

  }

}
