import { combineReducers } from 'redux';
import starShip, { StarShipState } from './redcuers/starShip';
import loading from './redcuers/loading';

export interface StoreState {
  starShip: StarShipState;
  loading: boolean;
}

const rootRedcuer = combineReducers<StoreState>({
  starShip,
  loading
});

export default rootRedcuer;
