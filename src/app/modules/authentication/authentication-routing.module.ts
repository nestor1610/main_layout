import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from "./components/forgotpassword/forgotpassword.component";
import { RegisterConfirmationComponent } from './components/registerconfirmation/registerconfirmation.component';
import { LockSesionComponent } from './components/locksesion/locksesion.component';
import { ResetPasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'registerconfirmation/:token',
    component: RegisterConfirmationComponent
  },
  {
    path: 'locksesion',
    component: LockSesionComponent
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent
  },
  {
    path: 'resetpassword/:token',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
