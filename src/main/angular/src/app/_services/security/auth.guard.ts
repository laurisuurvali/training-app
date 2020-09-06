import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import {UserSubscriptionService} from '../user/user-subscription.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public tokenService: TokenStorageService,
              public router: Router,
              private userSubscriptionService: UserSubscriptionService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const user = this.tokenService.getUser();
    this.userSubscriptionService.isSubscriptionOver().subscribe(result => {
      if (result === true) {
        this.tokenService.signOut();
        this.router.navigate(['']);
      }
    });

    if (
      this.tokenService.isTokenExpired() ||
      !user.roles.includes(expectedRole)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
