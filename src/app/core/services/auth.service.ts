import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }
}
