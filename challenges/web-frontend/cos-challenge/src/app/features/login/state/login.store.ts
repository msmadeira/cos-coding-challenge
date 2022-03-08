import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Authentication } from '../models/authentication.model';
import { LoginService } from '../services/login.service';
import { LoginFormValue } from '../models/login-form-value.model';

export interface LoginState {
  authentication: {
    entity: Authentication | undefined;
    loggingIn: boolean;
  };
}

export const loginInitialState: LoginState = {
  authentication: {
    entity: undefined,
    loggingIn: false,
  },
};

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {

  readonly authentication$ = this.select(({ authentication: { entity } }) => entity);
  readonly authenticationLoggingIn$ = this.select(({ authentication: { loggingIn } }) => loggingIn);

  private readonly setLoggingIn = this.updater((state: LoginState, loggingIn: boolean) => ({
    ...state,
    authentication: {
      ...state.authentication,
      loggingIn,
    },
  }));
  private readonly loginSuccess = this.updater((state: LoginState, entity: Authentication) => ({
    ...state,
    authentication: {
      ...state.authentication,
      entity,
      loggingIn: false,
    },
  }));

  readonly login = this.effect((data$: Observable<LoginFormValue>) =>
    data$
      .pipe(
        tap(() => this.setLoggingIn(true)),
        switchMap((payload: LoginFormValue) =>
          this.loginService.login(payload.email, payload.password)
            .pipe(
              tapResponse(
                authentication => {
                  this.loginSuccess(authentication);
                  localStorage.setItem('authentication', JSON.stringify(authentication));

                  this.router.navigate(['buyer-auctions']);
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

  constructor(private loginService: LoginService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super(loginInitialState);
  }
}
