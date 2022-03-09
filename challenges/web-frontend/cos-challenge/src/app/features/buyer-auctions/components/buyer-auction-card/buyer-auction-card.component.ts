import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, startWith, Subject, takeUntil } from 'rxjs';

import { BuyerAuctionView, FuelType, Transmission } from '../../models/buyer-auction-view.model';

@Component({
  selector: 'cos-buyer-auction-card',
  templateUrl: './buyer-auction-card.component.html',
  styleUrls: ['./buyer-auction-card.component.scss'],
})
export class BuyerAuctionCardComponent implements OnInit, OnDestroy {

  formattedRemainingTime: string = '';
  formattedAddress: string = '';
  vehicleImage: string = '';
  fuelType: string = '';
  transmission: string = '';

  private _auction: BuyerAuctionView | undefined;
  private _remainingTime: number = 0;
  private componentDestroyed$ = new Subject<void>();

  ngOnInit() {
    interval(1000)
      .pipe(
        startWith(undefined),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe(() => {
        if (!!this._remainingTime) {
          let totalSeconds = this._remainingTime;
          const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
          totalSeconds %= 3600;
          const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
          const seconds = String(totalSeconds % 60).padStart(2, '0');

          this.formattedRemainingTime = `${ hours }:${ minutes }:${ seconds }`;
          this._remainingTime--;
        }
      })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  @Input() set auction(val: BuyerAuctionView | undefined) {
    if (!!val) {
      this._auction = val;

      this.formattedAddress = this.getFormattedAddress();
      this.vehicleImage = this.getVehicleImage();
      this.fuelType = this.getFuelType();
      this.transmission = this.getTransmission();
      this._remainingTime = val.remainingTimeInSeconds;
    }
  }

  get auction(): BuyerAuctionView | undefined {
    return this._auction;
  }

  getFormattedAddress(): string {
    const { locationAddress, locationCity, locationZip, locationCountryCode } = this.auction!;
    const leftAddresses = [locationAddress, locationCity, locationZip];
    let address = '';

    address = leftAddresses
      .filter(v => !!v)
      .reduce((acc, v, i) => {
        acc += (i > 0 ? `, ${ v }` : v);

        return acc;
      }, '');

    if (!!locationCountryCode) {
      address += ` - ${ locationCountryCode }`;
    }

    return address;
  }

  getVehicleImage(): string {
    return this.auction?.associatedVehicle?.vehicleImages[0]?.url ?? '';
  }

  getFuelType(): string {
    const fuelType = this.auction?.associatedVehicle?.fuelType as number;

    return !isNaN(fuelType) ? Object.values(FuelType)[fuelType] as string : '';
  }

  getTransmission(): string {
    const transmission = this.auction?.associatedVehicle?.transmission as number;

    return !isNaN(transmission) ? Object.values(Transmission)[transmission] as string : '';
  }
}
