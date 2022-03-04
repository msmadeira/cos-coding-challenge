import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './features/login/login.module';
import { LoginRequiredGuard } from './core/guards/login-required.guard';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
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
