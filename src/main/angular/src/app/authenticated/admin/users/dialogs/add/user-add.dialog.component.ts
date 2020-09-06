import {Component, Inject} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from '../../../../../_models/subscription';
import {User} from '../../../../../_models/user';
import {SubscriptionService} from '../../../../../_services/admin/subscription.service';
import {UserService} from '../../../../../_services/admin/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add.dialog',
  templateUrl: './user-add.dialog.html',
  styleUrls: ['./user-add.dialog.css']
})

export class UserAddDialogComponent {

  subscriptions: Subscription[];
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<UserAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public userService: UserService,
              public subscriptionService: SubscriptionService,
              private snackBar: MatSnackBar) {

    subscriptionService.getAllSubscriptions().subscribe(result => {
      this.subscriptions = result;
    });
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(): string  {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(): void  {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.userService.addUser(this.data).subscribe(data => {
      this.dialogRef.close(1);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        console.log(error.name + ' ' + error.message);
        this.snackBar.open(this.errorMessage, null, {
          duration: 2000,
        });
      });
  }
}
