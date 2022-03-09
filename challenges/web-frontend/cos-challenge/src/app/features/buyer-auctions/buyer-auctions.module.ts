import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BuyerAuctionsComponent } from './containers/buyer-auctions/buyer-auctions.component';
import { BuyerAuctionsRoutingModule } from './buyer-auctions-routing.module';
import { BuyerAuctionsStore } from './state/buyer-auctions.store';
import { BuyerAuctionsService } from './services/buyer-auctions.service';
import { LoaderModule } from '../../shared/loader/loader.module';
import { BuyerAuctionCardComponent } from './components/buyer-auction-card/buyer-auction-card.component';
import { MaterialComponentsModule } from '../../shared/material-components/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    BuyerAuctionsRoutingModule,
    LoaderModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    BuyerAuctionsComponent,
    BuyerAuctionCardComponent,
  ],
  providers: [
    BuyerAuctionsStore,
    BuyerAuctionsService,
  ],
})
export class BuyerAuctionsModule {
}
