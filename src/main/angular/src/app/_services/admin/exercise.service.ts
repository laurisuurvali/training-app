import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Exercise} from '../../_models/exercise';

const API_URL = `${environment.apiUrl}admin/exercise/`;

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {


  constructor(private httpClient: HttpClient) {
  }

  getAllExercise(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(API_URL);
  }

  getExerciseById(exerciseId: number): Observable<Exercise> {
    return this.httpClient.get<Exercise>(API_URL + exerciseId);
  }

  getExercisesByChallengeDayId(challengeId: string, weekNumberId: string, dayNumberId: string): Observable<Exercise[]> {
    const params = new HttpParams().set('challengeId', challengeId).set('weekNumberId', weekNumberId).set('dayNumberId', dayNumberId);
    return this.httpClient.get<Exercise[]>(API_URL, {params});
  }

  addExercise(exercise: Exercise): any {
    return this.httpClient.post(API_URL, exercise);
  }

  updateExercise(exercise: Exercise): any {
    return this.httpClient.put(API_URL + exercise.exerciseId, exercise);
  }

  deleteExercise(id: number): any {
    return this.httpClient.delete(API_URL + id);
  }
}
