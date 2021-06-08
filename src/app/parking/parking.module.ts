import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ParkingRoutingModule } from './parking-routing.module';
import { CarFormComponent, CarListComponent } from './components';
import { ParkingComponent } from './containers';

@NgModule({
  declarations: [
    ParkingComponent,
    CarListComponent,
    CarFormComponent
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatSnackBarModule
  ]
})
export class ParkingModule {}
