import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './features/login/login.module';
import { MaterialComponentsModule } from './shared/material-components/material-components.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
