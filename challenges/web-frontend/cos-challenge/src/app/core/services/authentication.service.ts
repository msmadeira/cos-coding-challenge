import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Authentication } from '../../features/login/models/authentication.model';

@Injectable()
export class AuthenticationService {

  isLoggedIn: boolean = false;
  validatingToken: boolean = false;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private snackBar: MatSnackBar) {
  }

  get authentication(): Authentication | null {
    const auth = localStorage.getItem('authentication');
    return !!auth ? JSON.parse(auth) as Authentication : null;
  }

  authenticate(auth: Authentication) {
    localStorage.setItem('authentication', JSON.stringify(auth));
    this.isLoggedIn = true;
    this.validatingToken = false;

    this.router.navigate(['buyer-auctions']);
  }

  logout(navigate: boolean = true) {
    localStorage.removeItem('authentication');
    this.isLoggedIn = false;
    this.validatingToken = false;

    if (navigate) {
      this.router.navigate(['']);
    }
  }

  login(email: string, password: string): Observable<Authentication> {
    return this.httpClient.put<Authentication>(`authentication/${ email }`, { password });
  }

  validateToken(): Observable<boolean> {
    this.validatingToken = true;

    return this.httpClient.post<{ token: string }>(`authentication/${ this.authentication?.userId }`, {
      token: this.authentication?.token,
    })
      .pipe(
        map(() => {
          this.authenticate({
            ...this.authentication as Authentication,
          });

          return true;
        }),
        catchError(() => {
          this.logout(false);
          this.snackBar.open(
            'User could not be authenticated. Please try again',
            'dismiss',
            { duration: 2500 },
          );

          return of(false);
        }),
      );
  }
}
