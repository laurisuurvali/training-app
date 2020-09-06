import {Component, Inject, OnInit} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Challenge} from '../../../../../_models/challenge';
import {Subscription} from '../../../../../_models/subscription';
import {ChallengeService} from '../../../../../_services/admin/challenge.service';
import {SubscriptionService} from '../../../../../_services/admin/subscription.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './subscription-add.dialog.html',
  styleUrls: ['./subscription-add.dialog.css']
})

export class SubscriptionAddDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SubscriptionAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Subscription,
              public dataService: SubscriptionService,
              public challengeService: ChallengeService,
              private snackBar: MatSnackBar) {
  }

  challenges: Challenge[];
  errorMessage: string;

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void  {
    this.challengeService.getAllChallenges().subscribe(result => {
      this.challenges = result;
    });
  }

  getErrorMessage(): string {
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
    this.dataService.addSubscription(this.data).subscribe(data => {
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
