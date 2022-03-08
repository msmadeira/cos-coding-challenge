import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerAuctionsComponent } from './containers/buyer-auctions/buyer-auctions.component';
import { BuyerAuctionsRoutingModule } from './buyer-auctions-routing.module';
import { BuyerAuctionsStore } from './state/buyer-auctions.store';
import { BuyerAuctionsService } from './services/buyer-auctions.service';
import { LoaderModule } from '../../shared/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    BuyerAuctionsRoutingModule,
    LoaderModule,
  ],
  declarations: [
    BuyerAuctionsComponent,
  ],
  providers: [
    BuyerAuctionsStore,
    BuyerAuctionsService,
  ],
})
export class BuyerAuctionsModule {
}
