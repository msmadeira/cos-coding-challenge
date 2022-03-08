import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { MaterialComponentsModule } from '../../shared/material-components/material-components.module';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { LoginStore } from './state/login.store';
import { LoaderModule } from '../../shared/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    LoaderModule,
  ],
  declarations: [
    LoginComponent,
    LoginCardComponent,
  ],
  providers: [
    LoginGuard,
    LoginStore,
  ],
})
export class LoginModule {
}
