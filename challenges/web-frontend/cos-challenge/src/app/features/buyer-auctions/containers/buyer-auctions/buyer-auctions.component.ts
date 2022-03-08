import { Component, OnInit } from '@angular/core';
import { BuyerAuctionsStore } from '../../state/buyer-auctions.store';

@Component({
  selector: 'cos-buyer-auctions',
  templateUrl: './buyer-auctions.component.html',
  styleUrls: ['./buyer-auctions.component.scss'],
})
export class BuyerAuctionsComponent implements OnInit {

  constructor(public buyerAuctionsStore: BuyerAuctionsStore) {
  }

  ngOnInit() {
    this.buyerAuctionsStore.login('');
  }
}
