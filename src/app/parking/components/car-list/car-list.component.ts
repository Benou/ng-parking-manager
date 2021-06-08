import { Component, Input } from '@angular/core';

import { Car } from '../../shared';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  @Input() cars: Car[] | null;

  displayedColumns: string[];

  constructor() {
    this.cars = null;
    this.displayedColumns = ['plate', 'brand', 'model', 'color'];
  }
}
