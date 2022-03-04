import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerAuctionsComponent } from './buyer-auctions.component';

describe('BuyerAuctionsComponent', () => {
  let component: BuyerAuctionsComponent;
  let fixture: ComponentFixture<BuyerAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerAuctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
