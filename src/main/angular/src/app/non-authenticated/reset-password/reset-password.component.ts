import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/security/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../non-authenticated.component.css']
})
export class ResetPasswordComponent implements OnInit {

  errorMessage = '';
  submitButtonIsActive = true;

  constructor(private authService: AuthService,
              public router: Router) {
  }

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ])
  });


  get email(): AbstractControl {
    return this.resetPasswordForm.get('email');
  }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.submitButtonIsActive = false;
    console.log(this.resetPasswordForm.get('email'));
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/auth/reset-password-success'], {
          queryParams: {
            message: data.message
          }
        });
      },
      err => {
        this.submitButtonIsActive = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
