import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Challenge} from '../../_models/challenge';

const API_URL = `${environment.apiUrl}admin/challenge/`;

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient: HttpClient) {
  }

  getAllChallenges(): Observable<Challenge[]> {
    return this.httpClient.get<Challenge[]>(API_URL);
  }

  getChallengeById(challengeId: number): Observable<Challenge> {
    return this.httpClient.get<Challenge>(API_URL + challengeId);
  }

  addChallenge(challenge: Challenge): any {
    return this.httpClient.post(API_URL, challenge);
  }

  updateChallenge(challenge: Challenge): any {
    return this.httpClient.put(API_URL + challenge.challengeId, challenge);
  }

  deleteChallenge(id: number): any {
    return this.httpClient.delete(API_URL + id);
  }
}
