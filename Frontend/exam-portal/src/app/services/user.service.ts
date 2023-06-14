import { Injectable } from '@angular/core';
import { User } from '../pages/signup/User';
import { HttpClient } from '@angular/common/http';
import urlList from './Urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addUser(user: User) {
    return this.http.post(`${urlList.user.CREATE_USER}`, user);
  }

  // public getUser(username:String) {
  //   return this.http.
  // }
}
