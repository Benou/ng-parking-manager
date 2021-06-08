import { Car } from './car.interface';
import { LoadingState } from './loading-state.enum';

// The state model
export interface ParkingState {
  cars: Car[]; // render the table with cars
  callState: LoadingState;
  error: string;
}

export const initialState: ParkingState = {
  cars: [],
  callState: LoadingState.INIT,
  error: ''
};
