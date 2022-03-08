import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BuyerAuctionsService } from '../services/buyer-auctions.service';


export interface BuyerAuctionsState {
  entities: unknown[];
  loading: boolean;
}

export const buyerAuctionsInitialState: BuyerAuctionsState = {
  entities: [],
  loading: false,
};

@Injectable()
export class BuyerAuctionsStore extends ComponentStore<BuyerAuctionsState> {

  readonly entities$ = this.select(({ entities }: BuyerAuctionsState) => entities);
  readonly loading$ = this.select(({ loading }: BuyerAuctionsState) => loading);

  private readonly setLoading = this.updater((state: BuyerAuctionsState, loading: boolean) => ({
    ...state,
    loading,
  }));
  private readonly loadSuccess = this.updater((state: BuyerAuctionsState, entities: unknown[]) => ({
    ...state,
    entities,
    loading: false,
  }));

  readonly login = this.effect((data$: Observable<string>) =>
    data$
      .pipe(
        tap(() => this.setLoading(true)),
        switchMap((payload: string) =>
          this.buyerAuctionsService.load(payload)
            .pipe(
              tapResponse(
                entities => this.loadSuccess(entities),
                () => {
                  this.setLoading(false);
                  this.snackBar.open(
                    'There was an error while loading auctions, please try again.',
                    'dismiss',
                    { duration: 2500 },
                  );
                },
              ),
            ),
        ),
      ),
  );

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private buyerAuctionsService: BuyerAuctionsService) {
    super(buyerAuctionsInitialState);
  }
}
