import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BaseInterceptor } from './base.interceptor';
import { AuthenticationService } from '../services/authentication.service';
import { mockedAuthentication } from '../utils/test.utils';

describe('BaseInterceptor', () => {
  let authenticationService: AuthenticationService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BaseInterceptor,
          multi: true,
        },
        AuthenticationService,
      ],
    });

    authenticationService = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it('should add base api url but no authentication headers when user is not logged in', () => {
    authenticationService.isLoggedIn = false;

    httpClient.get('test')
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });

    const testRequest = httpMock.expectOne(request => request.url.includes('test'));
    expect(testRequest.request.url).toContain('https://api-core-dev.caronsale.de/api/');
    expect(testRequest.request.headers.get('userid')).toBeFalsy();
    expect(testRequest.request.headers.get('authtoken')).toBeFalsy();
  });

  it('should add base api url and authentication headers when user is logged in', () => {
    Object.defineProperty(authenticationService, 'authentication', {
      get: jest.fn(() => mockedAuthentication),
    });
    authenticationService.isLoggedIn = true;

    httpClient.get('test')
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });

    const testRequest = httpMock.expectOne(request => request.url.includes('test'));
    expect(testRequest.request.url).toContain('https://api-core-dev.caronsale.de/api/');
    expect(testRequest.request.headers.get('userid')).toBe(mockedAuthentication.userId);
    expect(testRequest.request.headers.get('authtoken')).toBe(mockedAuthentication.token);
  });
});
