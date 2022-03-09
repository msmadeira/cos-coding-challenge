import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuyerAuctionCardComponent } from './buyer-auction-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
