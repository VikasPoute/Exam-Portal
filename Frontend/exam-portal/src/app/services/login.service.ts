import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import urlList from './Urls';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginStatusChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  // Generate token
  public generateToken(loginData: any) {
    return this.http.post(`${urlList.authenticator.GENERATE_TOKEN}`, loginData);
  }

  // Get current user
  public getCurrentUser() {
    return this.http.get(`${urlList.authenticator.CURRENT_USER}`);
  }

  // Login user
  public setUserLoginToken(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  // User is login or not logged
  public isUserLogin() {
    const token = localStorage.getItem('token');
    return token == undefined || token == '' || token == null ? false : true;
  }

  // User login
  public userLogin() {
    this.loginStatusChange.next(true); // Emit login event
  }

  // User logout
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusChange.next(false); // Emit logout event
    return true;
  }

  // get token from local storage
  public getToken() {
    return localStorage.getItem('token');
  }

  // set user details in local storage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  // get user details from local storage
  public getUser() {
    const rawValue = localStorage.getItem('user');
    if (rawValue != null) {
      return JSON.parse(rawValue);
    } else {
      this.logOut();
      return null;
    }
  }

  // Get user role
  public getUserRole() {
    const user = this.getUser();

    if (user && user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority;
    }

    return null;
  }

  // Get login status change observable
  public getLoginStatusChangeObservable() {
    return this.loginStatusChange.asObservable();
  }
}
