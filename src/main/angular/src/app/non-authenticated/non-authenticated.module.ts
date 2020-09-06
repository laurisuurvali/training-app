import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {ResetGuard} from '../_services/security/reset.guard';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {NonAuthenticatedComponent} from './non-authenticated.component';
import {ResetPasswordErrorComponent} from './reset-password-error/reset-password-error.component';
import {ResetPasswordSuccessComponent} from './reset-password-success/reset-password-success.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ResetGuard],
    children: [
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'reset-password-success', component: ResetPasswordSuccessComponent},
      {path: 'reset-password-error', component: ResetPasswordErrorComponent},
      {path: 'new-password', component: NewPasswordComponent},
    ]
  },
  {path: '', component: LoginComponent},
  {path: '*', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    LoginComponent,
    NonAuthenticatedComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    ResetPasswordSuccessComponent,
    ResetPasswordErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],

  providers: [ResetGuard],
  exports: [
    NonAuthenticatedComponent
  ],
  bootstrap: [NonAuthenticatedComponent]
})
export class NonAuthenticatedModule {
}
