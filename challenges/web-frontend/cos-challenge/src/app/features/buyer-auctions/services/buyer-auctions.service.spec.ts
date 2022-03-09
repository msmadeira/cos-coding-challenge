import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BuyerAuctionsService } from './buyer-auctions.service';
import { mockedBuyerAuctionView } from '../../../utils/test.utils';

describe('BuyerAuctionsService', () => {
  let service: BuyerAuctionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        BuyerAuctionsService,
      ],
    });

    service = TestBed.inject(BuyerAuctionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return items when #load is called', done => {
    service.load('search')
      .subscribe((response) => {
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('filter')).toEqual('search');
        expect(req.request.params.get('count')).toEqual('false');
        expect(response).toStrictEqual([mockedBuyerAuctionView, mockedBuyerAuctionView, mockedBuyerAuctionView]);
        done();
      });

    const req = httpMock.expectOne(request => request.url.includes('auction/buyer'));
    req.flush({ items: [mockedBuyerAuctionView, mockedBuyerAuctionView, mockedBuyerAuctionView], page: 1, total: 3 });
  });
});
