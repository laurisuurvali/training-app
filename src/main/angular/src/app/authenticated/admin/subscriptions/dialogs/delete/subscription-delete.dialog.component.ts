import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SubscriptionService} from '../../../../../_services/admin/subscription.service';
import {UserService} from '../../../../../_services/admin/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './subscription-delete.dialog.html',
  styleUrls: ['./subscription-delete.dialog.css']
})
export class SubscriptionDeleteDialogComponent implements OnInit {

  currentSubscriptionUsersQuantity: number;
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<SubscriptionDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: SubscriptionService,
              public userService: UserService,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.userService.getAllUsersBySubscriptionId(this.data.subscriptionId).subscribe(result => {
      this.currentSubscriptionUsersQuantity = result.length;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteSubscription(this.data.subscriptionId).subscribe(data => {
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
