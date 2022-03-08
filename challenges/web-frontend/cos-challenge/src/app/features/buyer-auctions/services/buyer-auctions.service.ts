import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BuyerAuctionsService {

  constructor(private httpClient: HttpClient) {
  }

  load(filter: string): Observable<unknown[]> {
    let params = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('count', false);

    return this.httpClient.get<unknown[]>('auction/buyer', { params });
  }
}
