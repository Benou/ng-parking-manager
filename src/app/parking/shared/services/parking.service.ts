import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Car, cars } from '../models';

const FAKE_DELAY = 600;

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  add(plate: Car['plate']): Observable<Car> {
    try {
      const existingCar = this.cars.find((eCar: Car): boolean => eCar.plate === plate);

      if (existingCar) {
        throw `This car with plate ${plate} is already parked`;
      }

      const car = this.getCarByPlate(plate);
      this.cars = [...this.cars, car];

      return of(car).pipe(delay(FAKE_DELAY));
    } catch (error) {
      return throwError(error);
    }
  }

  private getCarByPlate(plate: Car['plate']): Car {
    const car = cars.find((item: Car): boolean => item.plate === plate);

    if (car) {
      return car;
    }

    throw `The car with plate ${plate} is not registered`;
  }
}
