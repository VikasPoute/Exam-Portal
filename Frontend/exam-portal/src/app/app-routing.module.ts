import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guard/admin/admin-guard.guard';
import { UserGuard } from './services/guard/user/user-guard.guard';
import { AuthGuard } from './services/guard/auth-guard.guard';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
