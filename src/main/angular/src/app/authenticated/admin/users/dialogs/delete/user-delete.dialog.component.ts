import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../../../_services/admin/user.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './user-delete.dialog.html',
  styleUrls: ['./user-delete.dialog.css']
})
export class UserDeleteDialogComponent {

  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<UserDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: UserService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteUser(this.data.id).subscribe(data => {
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
