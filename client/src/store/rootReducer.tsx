import { combineReducers } from 'redux';
import starShip, { StarShipState } from './reducers/starShip';
import loading from './reducers/loading';

export interface StoreState {
  starShip: StarShipState;
  loading: boolean;
}

const rootReducer = combineReducers<StoreState>({
  starShip,
  loading
});

export default rootReducer;
