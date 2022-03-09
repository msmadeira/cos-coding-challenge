import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginGuard } from './login.guard';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { mockedAuthentication } from '../../../core/utils/test.utils';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: Router;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        LoginGuard,
        AuthenticationService,
      ],
    });

    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);
    authenticationService = TestBed.inject(AuthenticationService);
  }));

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should route to #buyer-auctions when has authentication', () => {
    Object.defineProperty(authenticationService, 'authentication', {
      get: jest.fn(() => mockedAuthentication),
    });
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    const result = guard.canActivate(activatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toStrictEqual(router.createUrlTree(['buyer-auctions']));
  });

  it('should return true when no authentication', () => {
    Object.defineProperty(authenticationService, 'authentication', {
      get: jest.fn(() => null),
    });
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    const result = guard.canActivate(activatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBe(true);
  });
});
