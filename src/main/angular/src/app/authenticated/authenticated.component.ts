import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Challenge} from '../_models/challenge';
import {TokenStorageService} from '../_services/security/token-storage.service';
import {UserChallengeService} from '../_services/user/user-challenge.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent {

  @ViewChild('sidenav') sidenav: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  challenge: Challenge = new Challenge();

  constructor(private breakpointObserver: BreakpointObserver,
              public tokenService: TokenStorageService,
              private router: Router,
              private userChallengeService: UserChallengeService) {
    userChallengeService.getSubscriptionChallenge().subscribe(result => {
      this.challenge = result;
    });
  }

  closeSideNav(): void {
    if (this.sidenav._mode === 'over') {
      this.sidenav.close();
    }
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }



  isAdminLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    if (token != null) {
      return !this.tokenService.isTokenExpired(token) && this.tokenService.getUser().roles.includes('ROLE_ADMIN');
    }
    return false;
  }


  logout(): void {
    this.tokenService.signOut();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

}
