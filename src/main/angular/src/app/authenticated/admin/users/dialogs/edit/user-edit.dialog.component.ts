import {Component, Inject, OnInit} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from '../../../../../_models/subscription';
import {SubscriptionService} from '../../../../../_services/admin/subscription.service';
import {UserService} from '../../../../../_services/admin/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Status} from '../../../../../_models/status';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './user-edit.dialog.html',
  styleUrls: ['./user-edit.dialog.css']
})
export class UserEditDialogComponent implements OnInit {

  subscriptions: Subscription[];
  errorMessage: string;
  status = Object.values(Status);

  constructor(public dialogRef: MatDialogRef<UserEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: UserService,
              private subscriptionService: SubscriptionService,
              private snackBar: MatSnackBar) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
    console.log(this.data);
    this.subscriptionService.getAllSubscriptions().subscribe(result => {
      this.subscriptions = result;
    });
  }

  getErrorMessage(): string {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateUser(this.data).subscribe(data => {
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
