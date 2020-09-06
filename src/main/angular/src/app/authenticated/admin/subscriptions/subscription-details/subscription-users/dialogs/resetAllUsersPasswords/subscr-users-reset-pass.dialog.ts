import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../../../../../_services/admin/user.service';



@Component({
  selector: 'app-delete.dialog',
  templateUrl: './subscr-users-reset-pass.dialog.html',
  styleUrls: ['./subscr-users-reset-pass.dialog.css']
})
export class SubscrUsersResetPassDialog {

  errorMessage: string;
  isSubmitButtonEnabled = true;

  constructor(public dialogRef: MatDialogRef<SubscrUsersResetPassDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: UserService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmResetAllPasswords(): void {
    this.isSubmitButtonEnabled = false;
    this.dataService.resetAllUsersPasswordsBySubscriptionId(this.data.subscriptionId).subscribe(data => {
      this.dialogRef.close(1);
      },
      (error: HttpErrorResponse) => {
        this.isSubmitButtonEnabled = true;
        this.errorMessage = error.error.message;
        console.log(error.name + ' ' + error.message);
        this.snackBar.open(this.errorMessage, null, {
          duration: 2000,
        });
      });
  }
}
