import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialComponentsModule } from '../material-components/material-components.module';
import { LoaderComponent } from './loader.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {
}
