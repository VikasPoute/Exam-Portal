import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { LoginService } from 'src/app/services/login.service';
import { adminLoginData, afterLoginData, beforeLoginData } from './nav-data';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navDataBeforeLogin: INavbarData[] = beforeLoginData;
  navDataAfterLogin: INavbarData[] = afterLoginData;
  navAdminData: INavbarData[] = adminLoginData;
  navBar: BehaviorSubject<INavbarData[]> = new BehaviorSubject<INavbarData[]>([]);
  multiple: boolean = false;

  constructor(
    public router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.updateNavData();

    // Subscribe to login/logout events
    this.loginService.getLoginStatusChangeObservable().subscribe(() => {
      this.updateNavData();
    });
  }

  updateNavData(): void {
    if (this.loginService.isUserLogin()) {
      if (this.loginService.getUserRole() == 'ADMIN') {
        const getUsername = {
          routeLink: '/admin/profile',
          icon: 'account_circle',
          label: this.loginService.getUser().username,
        };

        const usernameExists = this.navAdminData.some(item => item.label === getUsername.label);

        if (!usernameExists) {
          // this.navAdminData.unshift(getUsername); // Add the object at the beginning of the array
          this.navAdminData.splice(1, 0, getUsername);
        }

        this.navBar.next(this.navAdminData)
      } else if (this.loginService.getUserRole() == "NORMAL") {
        const getUsername = {
          routeLink: '/profile',
          icon: 'person',
          label: this.loginService.getUser().username,
        };

        const usernameExists = afterLoginData.some(item => item.label === getUsername.label);

        if (!usernameExists) {
          // afterLoginData.unshift(getUsername); // Add the object at the beginning of the array
          this.navAdminData.splice(1, 0, getUsername);
        }
      }
    } else {
      this.navBar.next(beforeLoginData);
    }
  }


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navDataBeforeLogin.concat(this.navDataAfterLogin)) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  // logout from the application
  public userLogout() {
    if (this.loginService.isUserLogin()) {
      this.confirmLogout().then((result) => {
        if (result.isConfirmed) {
          this.logout();
          this.logoutSuccessfully();
        }
      });
    }
  }

  // Function to confirm user logout
  confirmLogout(): Promise<any> {
    return Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      return result;
    });
  }

  public logoutSuccessfully() {
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful!',
      text: 'You have been logged out.',
      showConfirmButton: false,
      timer: 2000 // Display the alert for 2 seconds
    });
  }


  // Function to logout the user
  logout() {
    this.loginService.logOut();
    this.router.navigate(['']);
  }

}
