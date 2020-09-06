import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Instruction} from '../../_models/instruction';

const API_URL = `${environment.apiUrl}user/instruction/`;

@Injectable({
  providedIn: 'root'
})
export class UserInstructionService {

  constructor(private httpClient: HttpClient) {
  }

  getCurrentWeekInstructions(): Observable<Instruction[]> {
    return this.httpClient.get<Instruction[]>(API_URL);
  }

  getCurrentWeekExerciseInstructions(): Observable<Instruction[]> {
    return this.httpClient.get<Instruction[]>(API_URL + 'exercise');
  }

  getTwoWeekMealInstructions(): Observable<Instruction[]> {
    return this.httpClient.get<Instruction[]>(API_URL + 'meal');
  }
}
