import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Meal} from '../../_models/meal';

const API_URL = `${environment.apiUrl}admin/meal/`;

@Injectable({
  providedIn: 'root'
})
export class MealService {


  constructor(private httpClient: HttpClient) {
  }

  getAllMeals(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(API_URL);
  }

  getMealById(mealId: number): Observable<Meal> {
    return this.httpClient.get<Meal>(API_URL + mealId);
  }

  getMealsByChallengeDayId(challengeId: string, weekNumberId: string, dayNumberId: string): Observable<Meal[]> {
    const params = new HttpParams().set('challengeId', challengeId).set('weekNumberId', weekNumberId).set('dayNumberId', dayNumberId);
    return this.httpClient.get<Meal[]>(API_URL, {params});
  }

  addMeal(meal: Meal): any {
    return this.httpClient.post(API_URL, meal);
  }

  updateMeal(meal: Meal): any {
    return this.httpClient.put(API_URL + meal.mealId, meal);
  }

  deleteMeal(id: number): any {
    return this.httpClient.delete(API_URL + id);
  }
}
