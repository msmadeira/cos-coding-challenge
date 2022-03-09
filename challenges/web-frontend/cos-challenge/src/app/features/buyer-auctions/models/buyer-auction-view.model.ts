interface SellerAccount {
  uuid: string;
  name: string;
  shouldApplyStandingCosts: boolean;
}

interface Auction {
  value: number;
  textFeedback: string;
  createdAt: Date;
}

interface Vehicle {
  uuid: string;
  id: string;
  vin: string;
  make: string;
  model: string;
  mileageInKm: number;
  ez: string;
  transmission: Transmission;
  fuelType: FuelType;
  numSeats: number;
  doors: number;
  hadAccident: boolean;
  hasDamages: boolean;
  vehicleImages: VehicleImages[];
  estimatedValue: number;
  licensePlate: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface VehicleImages {
  uuid: string;
  perspective: number;
  mimeType: string;
  encoding: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  rawData: unknown;
}

export enum FuelType {
  Gasoline,
  Ethanol,
  NaturalGas,
  Diesel,
  BioDiesel,
  Electric,
  Hybrid,
  BioFuel,
  Hydrogen,
}

export enum Transmission {
  Automatic,
  SemiAutomatic,
  Manual,
}

export interface BuyerAuctionView {
  id: number;
  label: string;
  endingTime: Date;
  amIInvolved: boolean;
  amIRegularBuyer: boolean;
  amIHighestBidder: boolean;
  sellerAccount: SellerAccount;
  rating: Auction;
  remainingTimeInSeconds: number;
  startedAt: Date;
  startingBidValue: number;
  currentHighestBidValue: number;
  currentHighestBidValueNet: number;
  minimumRequiredAsk: number;
  originalMinimumRequiredAsk: number;
  numBids: number;
  associatedVehicle: Vehicle;
  locationCountryCode: string;
  locationAddress: string;
  locationCity: string;
  locationZip: string;
  createdAt: Date;
  updatedAt: Date;
}


