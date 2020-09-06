import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../_models/user';

const API_URL = `${environment.apiUrl}admin/user/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  errorMessage: string;


  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL);
  }

  addUser(user: User): any {
    return this.httpClient.post(API_URL, user);
  }

  updateUser(user: User): any {
    return this.httpClient.put(API_URL + user.id, user);
  }

  deleteUser(id: number): any {
    return this.httpClient.delete(API_URL + id);
  }

  getAllUsersBySubscriptionId(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + 'subscription/' + id);
  }

  deleteUserSubscription(id: number): any {
    return this.httpClient.patch(API_URL + id, null);
  }

  resetAllUsersPasswordsBySubscriptionId(id: number): Observable<User[]> {
    const params = new HttpParams().set('shouldResetAllPasswords', 'true');
    return this.httpClient.get<User[]>(API_URL + 'subscription/' + id, {params});
  }

}




