import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import {UserSubscriptionService} from '../user/user-subscription.service';


@Injectable({
  providedIn: 'root'
})
export class ResetGuard implements CanActivate {

  constructor(public tokenService: TokenStorageService,
              public router: Router) {
  }

  canActivate(): boolean {
    if (this.isUserLoggedIn()) {
      this.tokenService.signOut();
      return true;
    }
    return !this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    if (token != null) {
      return !this.tokenService.isTokenExpired(token);
    }
    return false;
  }
}
