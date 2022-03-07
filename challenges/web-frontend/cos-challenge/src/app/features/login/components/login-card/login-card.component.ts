import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cos-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {

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

  getErrorMessage() {
    if (this.loginForm.get('email')!.hasError('required')) {
      return this.requiredErrorText;
    }

    return this.loginForm.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }
}
