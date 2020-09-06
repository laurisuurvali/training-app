import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Challenge} from '../../_models/challenge';

const API_URL = `${environment.apiUrl}user/challenge/`;

@Injectable({
  providedIn: 'root'
})
export class UserChallengeService {
  constructor(private httpClient: HttpClient) {
  }

  getSubscriptionChallenge(): Observable<Challenge> {
    return this.httpClient.get<Challenge>(API_URL);
  }
}
