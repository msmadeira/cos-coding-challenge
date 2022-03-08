import { Component } from '@angular/core';

import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'cos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public authenticationService: AuthenticationService) {
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
