import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Exercise} from '../../_models/exercise';

const API_URL = `${environment.apiUrl}user/exercise/`;

@Injectable({
  providedIn: 'root'
})
export class UserExerciseService {
  constructor(private httpClient: HttpClient) {
  }

  getCurrentWeekExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(API_URL);
  }
}
