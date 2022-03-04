import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerAuctionsComponent } from './containers/buyer-auctions/buyer-auctions.component';
import { BuyerAuctionsRoutingModule } from './buyer-auctions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BuyerAuctionsRoutingModule,
  ],
  declarations: [
    BuyerAuctionsComponent,
  ],
})
export class BuyerAuctionsModule {
}
