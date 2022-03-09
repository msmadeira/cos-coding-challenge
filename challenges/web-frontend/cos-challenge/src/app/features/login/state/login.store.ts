import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginFormValue } from '../models/login-form-value.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

export interface LoginState {
  loggingIn: boolean;
}

export const loginInitialState: LoginState = {
  loggingIn: false,
};

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {

  readonly loggingIn$ = this.select(({ loggingIn }: LoginState) => loggingIn);

  private readonly setLoggingIn = this.updater((state: LoginState, loggingIn: boolean) => ({
    ...state,
    loggingIn,
  }))

  readonly login = this.effect((data$: Observable<LoginFormValue>) =>
    data$
      .pipe(
        tap(() => this.setLoggingIn(true)),
        switchMap((payload: LoginFormValue) =>
          this.authenticationService.login(payload.email, payload.password)
            .pipe(
              tapResponse(
                authentication => {
                  this.setLoggingIn(false);

                  if (authentication.privileges.indexOf('SALESMAN_USER') !== -1) {
                    this.authenticationService.authenticate(authentication);
                  } else {
                    this.snackBar.open(
                      'Access denied, user is not a buyer.',
                      'dismiss',
                      { duration: 2500 },
                    );
                  }
                },
                () => {
                  this.setLoggingIn(false);
                  this.snackBar.open(
                    'User could not be authenticated, please try again.',
                    'dismiss',
                    { duration: 2500 },
                  );
                },
              ),
            ),
        ),
      ),
  );

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private authenticationService: AuthenticationService) {
    super(loginInitialState);
  }
}
