import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './features/login/login.module';
import { LoginRequiredGuard } from './core/guards/login-required.guard';
import { MaterialComponentsModule } from './shared/material-components/material-components.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    LoginRequiredGuard,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
