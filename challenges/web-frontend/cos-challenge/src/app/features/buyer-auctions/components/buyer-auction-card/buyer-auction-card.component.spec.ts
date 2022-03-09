import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BuyerAuctionCardComponent } from './buyer-auction-card.component';
import { mockedBuyerAuctionView } from '../../../../utils/test.utils';

describe('BuyerAuctionCardComponent', () => {
  let component: BuyerAuctionCardComponent;
  let fixture: ComponentFixture<BuyerAuctionCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BuyerAuctionCardComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAuctionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show highest bidder chip', () => {
    component.auction = { ...mockedBuyerAuctionView, amIHighestBidder: true };
    fixture.detectChanges();

    const chip = fixture.debugElement.query(By.css('.chip-wrapper'));

    expect(chip).toBeTruthy();
  });

  it('should hide highest bidder chip', () => {
    component.auction = { ...mockedBuyerAuctionView, amIHighestBidder: false };
    fixture.detectChanges();

    const chip = fixture.debugElement.query(By.css('.chip-wrapper'));

    expect(chip).toBeFalsy();
  });

  it('should set all non time related calculated properties', () => {
    component.auction = mockedBuyerAuctionView;

    expect(component.formattedAddress).toBe('Bela Vista, Porto Alegre, 90460030 - BR');
    expect(component.vehicleImage).toBe('mocked-url');
    expect(component.fuelType).toBe('Electric');
    expect(component.transmission).toBe('Automatic');
  });

  it('should put only necessary separators in #formattedAddress', () => {
    component.auction = { ...mockedBuyerAuctionView, locationZip: '', locationAddress: '', locationCountryCode: '' };

    expect(component.formattedAddress).toBe('Porto Alegre');
  });

  it('should set #formattedRemainingTime according to time passing', () => {
    jest.useFakeTimers();
    component.auction = mockedBuyerAuctionView;
    fixture.detectChanges();

    component.ngOnInit();

    expect(component.formattedRemainingTime).toBe('11:06:40');
    jest.advanceTimersByTime(40000);
    expect(component.formattedRemainingTime).toBe('11:06:00');
  });
});
