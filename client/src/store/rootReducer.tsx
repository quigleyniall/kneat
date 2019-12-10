import { combineReducers } from 'redux';
import starShipAnalysis, {
  StarShipAnalysis
} from './reducers/starShipAnalysis';
import starShip, { StarShip } from './reducers/starShip';
import loading from './reducers/loading';

export interface StoreState {
  starShipAnalysis: StarShipAnalysis;
  starShip: StarShip;
  loading: boolean;
}

const rootReducer = combineReducers<StoreState>({
  starShipAnalysis,
  starShip,
  loading
});

export default rootReducer;
