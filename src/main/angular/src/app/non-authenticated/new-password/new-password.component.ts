import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_services/security/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['../non-authenticated.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              public router: Router,
              private snackBar: MatSnackBar) {
  }


  get password(): AbstractControl {
    return this.newPasswordForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.newPasswordForm.get('confirmPassword');
  }

  passwordToken: string;
  errorMessage = '';


  newPasswordForm = new FormGroup({
      password: new FormControl('',
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)]),
      confirmPassword: new FormControl('',
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)])
    },
    this.checkPasswords
  );

  checkPasswords(group: FormGroup): any {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params);

          this.passwordToken = params.token;
          console.log(this.passwordToken);
        }
      );
  }

  onFormSubmit(): void {
    if (this.newPasswordForm.invalid) {
      this.snackBar.open('Paroolid ei kattu!', null, {
        duration: 2000,
      });
      return;
    }

    this.authService.saveNewPassword(this.newPasswordForm.value, this.passwordToken).subscribe(
      data => {
        this.router.navigate([''],  { queryParams: { successMessage: data.message } });
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
