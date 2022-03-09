import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerAuctionCardComponent } from './buyer-auction-card.component';

describe('BuyerAuctionCardComponent', () => {
  let component: BuyerAuctionCardComponent;
  let fixture: ComponentFixture<BuyerAuctionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerAuctionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAuctionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
