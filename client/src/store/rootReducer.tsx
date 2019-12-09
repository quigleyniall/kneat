import { combineReducers } from 'redux';
import starShipAnalysis, { StarShipState } from './reducers/starShipAnalysis';
import loading from './reducers/loading';

export interface StoreState {
  starShipAnalysis: StarShipState;
  loading: boolean;
}

const rootReducer = combineReducers<StoreState>({
  starShipAnalysis,
  loading
});

export default rootReducer;
