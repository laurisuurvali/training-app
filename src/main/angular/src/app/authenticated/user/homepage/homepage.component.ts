import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Challenge} from '../../../_models/challenge';
import {TokenStorageService} from '../../../_services/security/token-storage.service';
import {UserChallengeService} from '../../../_services/user/user-challenge.service';
import {UserSubscriptionService} from '../../../_services/user/user-subscription.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  name: string;
  subscriptionId: number;
  challenge: Challenge = new Challenge();
  totalChallengeDays = 0;
  currentChallengeDayNumber = 0;
  challengeDaysRemaining = 0;
  isSunday = false;
  videoLinkSRU: SafeResourceUrl;
  videoLink = 'https://player.vimeo.com/video/454389295';


  constructor(private tokenStorage: TokenStorageService,
              public sanitizer: DomSanitizer,
              public router: Router,
              private userChallengeService: UserChallengeService,
              private userSubscriptionService: UserSubscriptionService) {

  }

  ngOnInit(): void {
    this.videoLinkSRU = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoLink);
    if (this.tokenStorage.getToken()) {
      this.name = this.tokenStorage.getTokenPayLoad().firstName;
      this.subscriptionId = this.tokenStorage.getTokenPayLoad().subscriptionId;
    }
    this.isSunday = (new Date().getDay() === 0);

    this.userChallengeService.getSubscriptionChallenge().subscribe(result => {
      this.challenge = result;
      this.userSubscriptionService.getCurrentSubscriptionDayNumber().subscribe(res => {
        this.currentChallengeDayNumber = res;
        this.totalChallengeDays = this.challenge.weekQuantity * 7;
        this.challengeDaysRemaining = this.totalChallengeDays - this.currentChallengeDayNumber;
      });

    });
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo(0, 0);
  }
}
