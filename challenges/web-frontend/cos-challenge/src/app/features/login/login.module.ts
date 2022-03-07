import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './containers/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { MaterialComponentsModule } from '../../shared/material-components/material-components.module';
import { LoginCardComponent } from './components/login-card/login-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
  ],
  declarations: [
    LoginComponent,
    LoginCardComponent,
  ],
  providers: [
    LoginGuard,
  ],
})
export class LoginModule {
}
