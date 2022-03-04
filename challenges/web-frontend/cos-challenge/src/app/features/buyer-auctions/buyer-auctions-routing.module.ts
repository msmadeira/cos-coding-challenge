import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyerAuctionsComponent } from './containers/buyer-auctions/buyer-auctions.component';
import { LoginRequiredGuard } from '../../core/guards/login-required.guard';

const routes: Routes = [
  {
    path: '',
    component: BuyerAuctionsComponent,
    canActivate: [LoginRequiredGuard],
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class BuyerAuctionsRoutingModule {
}
