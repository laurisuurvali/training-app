import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Subscription} from '../../_models/subscription';

const API_URL = `${environment.apiUrl}admin/subscription/`;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {


  constructor(private httpClient: HttpClient) {
  }

  getSubscriptionById(id: number): Observable<Subscription> {
    return this.httpClient.get<Subscription>(API_URL + id);
  }


  getAllSubscriptions(): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>(API_URL);
  }

  addSubscription(subscription: Subscription): any {
    return this.httpClient.post(API_URL, subscription);
  }

  updateSubscription(subscription: Subscription): any {
    return this.httpClient.put(API_URL + subscription.subscriptionId, subscription);
  }

  deleteSubscription(id: number): any {
    return this.httpClient.delete(API_URL + id);
  }
}
