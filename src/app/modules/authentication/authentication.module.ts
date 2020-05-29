import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AccessService } from 'src/app/core/services/access/access.service';
import { LocationService } from 'src/app/core/services/locations/location.service';
import { OrganizationsService } from 'src/app/core/services/organizations/organizations.service';
import { SigninService } from 'src/app/core/services/signin/signin.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { MaterialModule } from '../material/material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { LockSesionComponent } from './components/locksesion/locksesion.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterConfirmationComponent } from './components/registerconfirmation/registerconfirmation.component';
import { ResetPasswordComponent } from './components/resetpassword/resetpassword.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AuthenticationRoutingModule,
    TextMaskModule,
    MaterialModule,

  ],
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    ForgotPasswordComponent, 
    RegisterConfirmationComponent, 
    LockSesionComponent, 
    ResetPasswordComponent
  ],
  providers: [
    AccessService, 
    SigninService,
    UsersService,
    OrganizationsService,
    LocationService
  ]
})
export class AuthenticationModule { }
