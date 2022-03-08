import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pluck } from 'rxjs';

import { BuyerAuctionView } from '../models/buyer-auction-view.model';

@Injectable()
export class BuyerAuctionsService {

  constructor(private httpClient: HttpClient) {
  }

  load(filter: string): Observable<BuyerAuctionView[]> {
    let params = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('count', false);

    return this.httpClient
      .get<{ items: BuyerAuctionView[]; page: number; total: number; }>('v2/auction/buyer/', { params })
      .pipe(pluck('items'));
  }
}
