import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginStore } from '../../state/login.store';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { LoginFormValue } from '../../models/login-form-value.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginStore: LoginStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      declarations: [
        LoginComponent,
      ],
      providers: [
        LoginStore,
        AuthenticationService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();

    loginStore = TestBed.inject(LoginStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #login with proper params', () => {
    jest.spyOn(loginStore, 'login');
    const loginFormValue: LoginFormValue = {
      email: 'test@test.com',
      password: '123',
    };

    component.onLogin(loginFormValue);

    expect(loginStore.login).toHaveBeenCalledWith(loginFormValue);
  });
});
