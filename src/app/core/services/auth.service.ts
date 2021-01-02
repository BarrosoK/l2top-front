import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Backend} from "@app/types/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  register(username: string, email: string, password: string) {
    return this.http.post<Backend.Register>(`${environment.apiUrl}/auth/register`, {
      name: username,
      email,
      password
    });
  }
}
