import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}user/subscription_current_state/`;

@Injectable({
  providedIn: 'root'
})
export class UserSubscriptionService {
  constructor(private httpClient: HttpClient) {
  }

  isSubscriptionOver(): Observable<boolean> {
    return this.httpClient.get<boolean>(API_URL);
  }

  getCurrentSubscriptionWeekNumber(): Observable<number> {
    return this.httpClient.get<number>(API_URL + 'week');
  }

  getCurrentSubscriptionWeekDayNumber(): Observable<number> {
    return this.httpClient.get<number>(API_URL + 'week_day');
  }

  getCurrentSubscriptionDayNumber(): Observable<number> {
    return this.httpClient.get<number>(API_URL + 'day');
  }
}
