import {Component, OnInit} from '@angular/core';
// import { AuthService } from '../../_services/auth.service';
// import { TokenStorageService } from '../../_services/token-storage.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, NavigationStart, Params, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {AuthService} from '../../_services/security/auth.service';
import {TokenStorageService} from '../../_services/security/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../non-authenticated.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  successMessage?: string;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              public router: Router,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {

    this.route.queryParams
      .subscribe(params => {
          this.successMessage = params.successMessage;
          console.log(this.successMessage);
          if (this.successMessage) {
            snackBar.open(this.successMessage, null, {
              duration: 2000,
            });
          }
        }
      );

  }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });


  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.isTokenExpired()) {
        this.isLoggedIn = false;
        return;
      }
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getTokenPayLoad().roles;
      this.router.navigate(['/user/homepage']);
    }
  }

  onFormSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      data => {

        this.tokenStorage.saveTokenAndUser(data.token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getTokenPayLoad().roles;
        this.router.navigate(['/user/homepage']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }

  reloadPage(): void {
    window.location.reload();
  }
}

