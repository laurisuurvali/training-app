import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ChallengeDay} from '../../_models/challenge-day';

const API_URL = `${environment.apiUrl}admin/challenge_day/`;

@Injectable({
  providedIn: 'root'
})
export class ChallengeDayService {


  constructor(private httpClient: HttpClient) {
  }

  getAllChallengeDays(): Observable<ChallengeDay[]> {
    console.log('getAllChallengeDays');
    return this.httpClient.get<ChallengeDay[]>(API_URL);
  }

  getAllChallengeDaysDayByChallengeId(challengeId: number): Observable<ChallengeDay[]> {
    return this.httpClient.get<ChallengeDay[]>(API_URL + 'challenge/' + challengeId);
  }

  getChallengeDayBySeparateId(challengeId: number, weekNumberId: string, dayNumberId: string): Observable<ChallengeDay> {
    const params = new HttpParams().set('weekNumberId', weekNumberId).set('dayNumberId', dayNumberId);
    return this.httpClient.get<ChallengeDay>(API_URL + 'challenge/' + challengeId + '/challenge_day', {params});
  }

  addChallengeDay(challengeDay: ChallengeDay): void {
    this.httpClient.post(API_URL, challengeDay).subscribe(data => {
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  deleteChallengeDay(id: number): void {
    this.httpClient.delete(API_URL + id);
  }
}
