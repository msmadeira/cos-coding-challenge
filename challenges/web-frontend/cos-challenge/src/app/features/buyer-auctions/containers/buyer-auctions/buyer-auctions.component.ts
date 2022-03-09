import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, interval, startWith, Subject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';

import { BuyerAuctionsStore } from '../../state/buyer-auctions.store';

@Component({
  selector: 'cos-buyer-auctions',
  templateUrl: './buyer-auctions.component.html',
  styleUrls: ['./buyer-auctions.component.scss'],
})
export class BuyerAuctionsComponent implements OnInit, OnDestroy {

  searchControl = new FormControl();

  private componentDestroyed$ = new Subject<void>();

  constructor(public buyerAuctionsStore: BuyerAuctionsStore) {
  }

  ngOnInit() {
    interval(20000)
      .pipe(
        startWith(undefined),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe(() => this.loadAuctions());

    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((search: string) => this.loadAuctions(search));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  loadAuctions(search: string = '') {
    this.buyerAuctionsStore.load(search);
  }
}
