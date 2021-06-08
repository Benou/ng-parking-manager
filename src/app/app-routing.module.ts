import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'parking',
    loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule)
  },
  {
    path: '**',
    redirectTo: 'parking'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
