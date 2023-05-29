import { Injectable } from '@angular/core';
import { User } from '../pages/signup/User';
import { HttpClient } from '@angular/common/http';
import baseUrl from './Urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addUser(user: User) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
}
