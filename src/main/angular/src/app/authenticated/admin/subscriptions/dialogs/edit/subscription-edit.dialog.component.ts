import {Component, Inject, OnInit} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Challenge} from '../../../../../_models/challenge';
import {ChallengeService} from '../../../../../_services/admin/challenge.service';
import {SubscriptionService} from '../../../../../_services/admin/subscription.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './subscription-edit.dialog.html',
  styleUrls: ['./subscription-edit.dialog.css']
})
export class SubscriptionEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SubscriptionEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: SubscriptionService,
              public challengeService: ChallengeService,
              private snackBar: MatSnackBar) {

  }

  challenges: Challenge[] = [];
  selectedChallengeIndex = -1;
  selectedChallenge: Challenge;
  errorMessage: string;

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
    this.challengeService.getAllChallenges().subscribe(result => {
      this.challenges = result;
      this.selectedChallengeIndex = this.challenges.findIndex(challenge => {
        return challenge.challengeId === this.data.challenge.challengeId;
      });
      this.selectedChallenge = this.challenges[this.selectedChallengeIndex];
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
    this.data.challenge = this.selectedChallenge;
    this.dataService.updateSubscription(this.data).subscribe(data => {
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
