import { Component } from '@angular/core';

import { LoginFormValue } from '../../models/login-form-value.model';
import { LoginStore } from '../../state/login.store';

@Component({
  selector: 'cos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(public loginStore: LoginStore) {
  }

  onLogin(formValue: LoginFormValue) {
    this.loginStore.login(formValue);
  }
}
