import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { authInterceptorProvider } from './services/intercepter/auth.interceptor';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { UserGuard } from './services/guard/user/user-guard.guard';
import { AdminGuard } from './services/guard/admin/admin-guard.guard';
import { AuthGuard } from './services/guard/auth-guard.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { MaterialModule } from './material/material.module';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';

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
    AddQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [authInterceptorProvider, UserGuard, AdminGuard, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
