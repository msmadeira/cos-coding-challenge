
# CosChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

# General notes

- This project was developed using Node v16.13.2, in case of any issues please install this version.
- The IDE of choice was WebStorm, no configuration files for other IDE's where added in the repository but no problems should occur if opened in them.

# Implementation Notes

- Even though Angular Material was used, I choose to not use mat-grid-list because of the poor support for responsiveness.
- I noticed inconsistencies in some Swagger models (required fields that where not really required) so I choose to only add in interfaces what was needed and some extras.
- Didn't find the enum for Vehicle FuelType and Transmission, so I made my own enum, values should be a little inconsistent with the correct ones because of this.
- I added search functionality to auctions passing `filter` to endpoint, but backend doesn't seem to be returning filtered values as expected. I left the functionality in code just in case.
