import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BuyerAuctionsComponent } from './buyer-auctions.component';
import { buyerAuctionsInitialState, BuyerAuctionsStore } from '../../state/buyer-auctions.store';
import { BuyerAuctionsService } from '../../services/buyer-auctions.service';

describe('BuyerAuctionsComponent', () => {
  let component: BuyerAuctionsComponent;
  let fixture: ComponentFixture<BuyerAuctionsComponent>;
  let store: BuyerAuctionsStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      declarations: [
        BuyerAuctionsComponent,
      ],
      providers: [
        BuyerAuctionsStore,
        BuyerAuctionsService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();

    store = TestBed.inject(BuyerAuctionsStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when #loading$ is true', () => {
    store.setState({
      ...buyerAuctionsInitialState,
      loading: true,
    });
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('cos-loader'));

    expect(loader).toBeTruthy();
  });

  it('should hide loader when #loading$ is false', () => {
    store.setState({
      ...buyerAuctionsInitialState,
      loading: false,
    });
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('cos-loader'));

    expect(loader).toBeFalsy();
  });

  it('should call #loadAuctions when #searchControl is set', () => {
    jest.spyOn(component, 'loadAuctions');
    jest.useFakeTimers();

    component.searchControl.setValue('search');
    jest.advanceTimersByTime(400);

    expect(component.loadAuctions).toHaveBeenCalledTimes(1);
  });

  it('should call #loadAuctions every 20s', () => {
    jest.spyOn(component, 'loadAuctions');
    jest.useFakeTimers();

    component.ngOnInit();
    jest.advanceTimersByTime(40000);

    expect(component.loadAuctions).toHaveBeenCalledTimes(3);
  });
});
