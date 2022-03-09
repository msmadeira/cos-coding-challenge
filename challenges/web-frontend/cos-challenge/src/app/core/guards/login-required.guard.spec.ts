import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginRequiredGuard } from './login-required.guard';
import { AuthenticationService } from '../services/authentication.service';

describe('LoginRequiredGuard', () => {
  let guard: LoginRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      providers: [
        LoginRequiredGuard,
        AuthenticationService,
      ],
    });
    guard = TestBed.inject(LoginRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
