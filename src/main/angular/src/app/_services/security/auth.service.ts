import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


const ADMIN_API = `${environment.apiUrl}admin/`;
const AUTH_API = `${environment.apiUrl}auth/`;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(ADMIN_API + 'register', {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email
    }, httpOptions);
  }

  resetPassword(user): Observable<any> {
    console.log(user.email);
    const params = new HttpParams().set('email', user.email);
    return this.http.get(AUTH_API + 'reset_password', {
      params
    });
  }

  saveNewPassword(user, passwordToken): Observable<any> {
    console.log(user.password);
    console.log(passwordToken);
    return this.http.post(AUTH_API + 'save_password', {
      newPassword: user.password,
      token: passwordToken,
    }, httpOptions);
  }
}
