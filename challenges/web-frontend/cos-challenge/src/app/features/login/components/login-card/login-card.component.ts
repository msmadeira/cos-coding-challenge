import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginFormValue } from '../../models/login-form-value.model';

@Component({
  selector: 'cos-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent {

  @Output() login = new EventEmitter<LoginFormValue>();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  readonly requiredErrorText = 'You must enter a value';

  get emailControl(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  getErrorMessage(): string {
    if (this.loginForm.get('email')!.hasError('required')) {
      return this.requiredErrorText;
    }

    return this.loginForm.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  onLogin() {
    const formValues: LoginFormValue = this.loginForm.value;

    this.login.emit(formValues);
  }
}
