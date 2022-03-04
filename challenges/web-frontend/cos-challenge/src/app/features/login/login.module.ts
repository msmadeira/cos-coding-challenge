import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './containers/login/login.component';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginGuard,
  ],
})
export class LoginModule {
}
