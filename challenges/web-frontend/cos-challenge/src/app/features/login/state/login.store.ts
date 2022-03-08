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
                  this.authenticationService.authenticate(authentication);
                },
                () => {
                  this.setLoggingIn(false);
                  this.snackBar.open(
                    'User could not be authenticated. Please try again',
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
