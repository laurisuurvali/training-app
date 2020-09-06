import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../../../_services/security/auth.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './user-reset-password.dialog.html',
  styleUrls: ['./user-reset-password.dialog.css']
})
export class UserResetPasswordDialogComponent {

  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<UserResetPasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: AuthService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmSend(): void {
    this.dataService.resetPassword(this.data).subscribe(data => {
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
