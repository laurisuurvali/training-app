import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Challenge} from '../../../../_models/challenge';
import {Subscription} from '../../../../_models/subscription';
import {ChallengeService} from '../../../../_services/admin/challenge.service';
import {SubscriptionService} from '../../../../_services/admin/subscription.service';
import {SubscrUsersResetPassDialog} from "./subscription-users/dialogs/resetAllUsersPasswords/subscr-users-reset-pass.dialog";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.css']
})
export class SubscriptionDetailsComponent implements OnInit {

  subscriptionId: number;
  subscription: Subscription = new Subscription();
  challenges: Challenge[] = new Array<Challenge>();
  challengeName = '';

  isEditEnable = false; // to show and hide the edit button

  form: FormGroup;
  challengesControl: FormControl;

  constructor(
    private activateRoute: ActivatedRoute,
    public subscriptionService: SubscriptionService,
    public challengeService: ChallengeService,
    public dialog: MatDialog,
  ) {
    this.subscriptionId = activateRoute.snapshot.params.id;
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  ngOnInit(): void {
    this.subscriptionService.getSubscriptionById(this.subscriptionId).subscribe(result => {
      this.subscription = result;
      this.challengeName = this.subscription.challenge.challengeName;
    });

    this.challengeService.getAllChallenges().subscribe(result => {
      this.challenges = result;
      this.challengesControl = new FormControl(this.challengeName);
    });
  }

  getErrorMessage(): string {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  sendResetPasswordLinkToAllUsers(): void {
    const dialogRef = this.dialog.open(SubscrUsersResetPassDialog, {
      data: {subscriptionId: this.subscriptionId, challengeName: this.challengeName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

      }
    });
  }
}

