import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {
}
