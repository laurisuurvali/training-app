import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Meal} from '../../_models/meal';

const API_URL = `${environment.apiUrl}user/meal/`;

@Injectable({
  providedIn: 'root'
})
export class UserMealService {
  constructor(private httpClient: HttpClient) {
  }

  getTwoWeekMeals(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(API_URL);
  }
}
