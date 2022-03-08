import { TestBed } from '@angular/core/testing';

import { BuyerAuctionsService } from './buyer-auctions.service';

describe('BuyerAuctionsService', () => {
  let service: BuyerAuctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerAuctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
