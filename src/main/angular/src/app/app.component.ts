import {Component} from '@angular/core';
import {TokenStorageService} from './_services/security/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';

  constructor(private tokenService: TokenStorageService) {
  }

  isUserLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    if (token != null) {
      return !this.tokenService.isTokenExpired(token);
    }
    return false;
  }
}
