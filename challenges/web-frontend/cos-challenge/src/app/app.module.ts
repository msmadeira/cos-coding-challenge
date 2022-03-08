import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './features/login/login.module';
import { MaterialComponentsModule } from './shared/material-components/material-components.module';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './shared/header/header.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    CoreModule,
    MaterialComponentsModule,
    HeaderModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
