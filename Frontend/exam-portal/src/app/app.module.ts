import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './pages/signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { authInterceptorProvider } from './services/intercepter/auth.interceptor';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { UserGuard } from './services/guard/user/user-guard.guard';
import { AdminGuard } from './services/guard/admin/admin-guard.guard';
import { AuthGuard } from './services/guard/auth-guard.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    HomeComponent,
    SublevelMenuComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminComponent,
    ProfileComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    ViewQuizzesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    NgbModule,
    MatDividerModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatExpansionModule,
  ],
  providers: [authInterceptorProvider, UserGuard, AdminGuard, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
