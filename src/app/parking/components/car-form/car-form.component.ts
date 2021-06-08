import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarFormComponent implements OnChanges {
  @Input() pending: boolean;
  @Input() succeed: boolean;
  @Output() addCar: EventEmitter<string>;

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective | null;

  form: FormGroup;
  plates: string[];

  get plateControl(): FormControl {
    return this.form.get('plate') as FormControl;
  }

  constructor(private fb: FormBuilder) {
    this.pending = false;
    this.succeed = false;
    this.formDirective = null;
    this.form = this.fb.group({
      plate: ['', Validators.required]
    });
    this.plates = ['2FMDK3', '1GYS4C', '1GKS1E', '1G6AS5'];
    this.addCar = new EventEmitter<string>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.succeed && this.succeed) {
      this.form.reset();
      this.formDirective!.resetForm();
    }
    if (changes.pending) {
      this.pending ? this.form.disable() : this.form.enable();
    }
  }

  selectPlate(change: MatSelectChange): void {
    this.plateControl.setValue(change.value);
  }

  addCarByPlate(): void {
    this.addCar.emit(this.plateControl.value);
  }
}
