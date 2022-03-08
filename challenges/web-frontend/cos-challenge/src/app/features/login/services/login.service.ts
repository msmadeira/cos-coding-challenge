import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../models/authentication.model';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<Authentication> {
    return this.httpClient.put<Authentication>(`authentication/${ email }`, { password });
  }

  validateToken(authentication: Authentication): Observable<Authentication> {
    return this.httpClient.post<Authentication>(`authentication/${ authentication.userId }`, {
      token: authentication.token,
    });
  }
}
