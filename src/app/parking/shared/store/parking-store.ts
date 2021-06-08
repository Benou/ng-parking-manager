import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { initialState, Car, LoadingState, ParkingState } from '../models';
import { ParkingService } from '../services';

@Injectable()
export class ParkingStore extends ComponentStore<ParkingState> {
  constructor(private parkingService: ParkingService) {
    super({ ...initialState });
  }

  // SELECTORS
  private readonly cars$: Observable<Car[]> = this.select(state => state.cars);
  private readonly loading$: Observable<boolean> = this.select(
    state => state.callState === LoadingState.LOADING
  );
  private readonly loaded$: Observable<boolean> = this.select(
    state => state.callState === LoadingState.LOADED
  );
  private readonly error$: Observable<string> = this.select(state => state.error);

  // ViewModel for the component
  readonly vm$: Observable<{ cars: Car[], loading: boolean, loaded: boolean, error: string }> = this.select(
    this.cars$,
    this.loading$,
    this.loaded$,
    this.error$,
    (cars, loading, loaded, error) => ({
      cars,
      loading,
      loaded,
      error
    })
  );

  // UPDATERS
  readonly updateError = this.updater((state: ParkingState, error: string) => {
    return { ...state, error, callState: LoadingState.INIT };
  });

  readonly setLoading = this.updater((state: ParkingState) => {
    return { ...state, error: '', callState: LoadingState.LOADING };
  });

  readonly setLoaded = this.updater((state: ParkingState) => {
    return { ...state, callState: LoadingState.LOADED };
  });

  readonly updateCars = this.updater((state: ParkingState, car: Car) => {
    return { ...state, cars: [...state.cars, car] };
  });

  // EFFECTS
  readonly addCarToParkingLot = this.effect((plate$: Observable<string>) => {
    return plate$.pipe(
      concatMap((plate: string) => {
        this.setLoading();
        return this.parkingService.add(plate).pipe(
          tapResponse(
            car => {
              this.setLoaded();
              this.updateCars(car);
            },
            err => this.updateError(err as string)
          )
        );
      })
    );
  });
}
