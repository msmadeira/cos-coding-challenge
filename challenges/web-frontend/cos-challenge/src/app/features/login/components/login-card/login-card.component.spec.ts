import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginCardComponent } from './login-card.component';

describe('LoginCardComponent', () => {
  let component: LoginCardComponent;
  let fixture: ComponentFixture<LoginCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginCardComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('mat-error'));

    expect(errors.length).toBe(2);
  });

  describe('getErrorMessage', () => {
    it('should return required text when has required error', () => {
      component.loginForm.get('email')?.setValue('');

      expect(component.errorMessage).toContain('You must enter a value');
    });

    it('should return invalid email text when has email error', () => {
      component.loginForm.get('email')?.setValue('test');

      expect(component.errorMessage).toContain('Not a valid email');
    });

    it('should return empty string to form with no errors', () => {
      component.loginForm.get('email')?.setValue('test@test.com');

      expect(component.errorMessage).toBe('');
    });
  });

  it('should emit login with form value', () => {
    jest.spyOn(component.login, 'emit');
    const value = { email: 'test@test.com', password: '4546546546' };
    component.loginForm.setValue(value);

    component.onLogin();

    expect(component.login.emit).toHaveBeenCalledWith(value);
  });
});
