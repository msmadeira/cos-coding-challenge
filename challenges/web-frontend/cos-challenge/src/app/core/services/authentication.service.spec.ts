import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { mockedAuthentication } from '../../utils/test.utils';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        AuthenticationService,
      ],
    });

    service = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get auth from localStorage', () => {
    localStorage.setItem('authentication', JSON.stringify(mockedAuthentication));

    expect(service.authentication).toStrictEqual(mockedAuthentication);
  });

  it('should set auth in localStorage, and navigate to buyer-auctions when #authenticate is called', () => {
    jest.spyOn(router, 'navigate').mockImplementation();

    service.authenticate(mockedAuthentication);

    expect(router.navigate).toHaveBeenCalledWith(['buyer-auctions']);
    expect(localStorage.getItem('authentication')).toBe(JSON.stringify(mockedAuthentication));
  });

  it('should remove auth in localStorage, and navigate to root when #logout is called', () => {
    jest.spyOn(router, 'navigate').mockImplementation();

    service.logout(true);

    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(localStorage.getItem('authentication')).toBeFalsy();
  });

  it('should return authentication when #login is called', done => {
    service.login('test@test.com', '123456')
      .subscribe((response) => {
        expect(req.request.method).toEqual('PUT');
        expect(response).toStrictEqual(mockedAuthentication);
        done();
      });

    const req = httpMock.expectOne(request => request.url.includes('authentication'));
    req.flush(mockedAuthentication);
  });

  it('should return true when #validateToken and token is validated', done => {
    jest.spyOn(service, 'authenticate').mockImplementation();

    service.validateToken()
      .subscribe((response) => {
        expect(req.request.method).toEqual('POST');
        expect(response).toBeTruthy();
        expect(service.authenticate).toHaveBeenCalled();
        done();
      });

    const req = httpMock.expectOne(request => request.url.includes('authentication'));
    req.flush({ token: mockedAuthentication.token });
  });
});
