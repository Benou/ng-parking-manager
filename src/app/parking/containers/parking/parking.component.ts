import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Car, ParkingStore } from '../../shared';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
  providers: [ParkingStore]
})
export class ParkingComponent {
  vm$: Observable<{ cars: Car[], loading: boolean, loaded: boolean, error: string }>;

  constructor(private parkingStore: ParkingStore, private snackBar: MatSnackBar) {
    this.vm$ = this.parkingStore.vm$.pipe(
      tap(vm =>  {
        vm.error && !vm.loading && this.handleError(vm.error);
      })
    );
  }

  addCarByPlate(plate: string): void {
    this.parkingStore.addCarToParkingLot(plate);
  }

  handleError(error: string): void {
    this.snackBar.open(error, '', { duration: 3000 } as MatSnackBarConfig);
  }
}
