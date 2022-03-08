import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRequiredGuard } from './guards/login-required.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseInterceptor } from './interceptors/base.interceptor';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    LoginRequiredGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
}
