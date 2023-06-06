import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginService } from '../login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthGuardService, private router: Router, private loginService: LoginService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.loginService.getUserRole() == 'ADMIN') {
      this.router.navigate(['/admin'])
      return false
    } else if (this.authService.isLoggedIn() && this.loginService.getUserRole() == 'NORMAL') {
      return false
    } else {
      return true;
    }
  }
}
