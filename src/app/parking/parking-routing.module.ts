import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParkingComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ParkingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule {}
