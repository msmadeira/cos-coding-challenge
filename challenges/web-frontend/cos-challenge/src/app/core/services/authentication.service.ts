import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Authentication } from '../../features/login/models/authentication.model';

@Injectable()
export class AuthenticationService {

  private authenticationSubject$ = new BehaviorSubject(false);

  constructor(private router: Router) {
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.authenticationSubject$;
  }

  get authentication() {
    return localStorage.getItem('authentication');
  }

  authenticate(auth: Authentication) {
    localStorage.setItem('authentication', JSON.stringify(auth));

    this.router.navigate(['buyer-auctions']);
    this.authenticationSubject$.next(true);
  }

  logout() {
    localStorage.removeItem('authentication');

    this.router.navigate(['']);
    this.authenticationSubject$.next(false);
  }
}
