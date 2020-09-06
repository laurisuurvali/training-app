import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_services/security/auth.guard';
import {authInterceptorProviders} from '../_services/security/auth.interceptor';
import {SharedModule} from '../shared/shared.module';
import {AuthenticatedComponent} from './authenticated.component';


const appRoutes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: {expectedRole: 'ROLE_USER'},
    loadChildren: () => import('./user/user.module').then(module => module.UserModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {expectedRole: 'ROLE_ADMIN'},
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
  }
];

@NgModule({
  declarations: [
    AuthenticatedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],

  providers: [AuthGuard, authInterceptorProviders, HttpClientModule],
  exports: [
    AuthenticatedComponent
  ],
  bootstrap: [AuthenticatedComponent]
})
export class AuthenticatedModule {
}
