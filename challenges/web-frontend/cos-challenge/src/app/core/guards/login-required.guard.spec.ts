import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { LoginRequiredGuard } from './login-required.guard';
import { AuthenticationService } from '../services/authentication.service';
import { mockedAuthentication } from '../../utils/test.utils';

describe('LoginRequiredGuard', () => {
  let guard: LoginRequiredGuard;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        LoginRequiredGuard,
        AuthenticationService,
      ],
    });

    guard = TestBed.inject(LoginRequiredGuard);
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  }));

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when user is logged in', () => {
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();
    authenticationService.isLoggedIn = true;

    const result = guard.canActivate(activatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBeTruthy();
  });

  it('should route to login when no authentication', () => {
    Object.defineProperty(authenticationService, 'authentication', {
      get: jest.fn(() => null),
    });
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    const result = guard.canActivate(activatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toStrictEqual(router.createUrlTree(['login']));
  });

  it('should return true when has authentication and is validated', done => {
    jest.spyOn(authenticationService, 'validateToken').mockReturnValue(of(true));
    Object.defineProperty(authenticationService, 'authentication', {
      get: jest.fn(() => mockedAuthentication),
    });
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    const result = guard.canActivate(activatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<boolean>;

    result
      .subscribe(val => {
        expect(val).toBeTruthy();
        done();
      });
  });

  it('should route to login when has authentication and is not validated', done => {
    jest.spyOn(authenticationService, 'validateToken').mockReturnValue(of(false));
    Object.defineProperty(authenticationService, 'authentication', {
      get: jest.fn(() => mockedAuthentication),
    });
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    const result = guard.canActivate(activatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<UrlTree>;

    result
      .subscribe(val => {
        expect(val).toStrictEqual(router.createUrlTree(['login']));
        done();
      });
  });
});
