import { combineReducers } from 'redux';
import { createGeneralReducer } from './reducers/generalReducer/generalReducer';

import { createAnalysisReducer } from './reducers/analysisReducer/analysisReducer';

export interface StoreState {
  film: any;
  starShipAnalysis: any;
  starShip: any;
  species: any;
  people: any;
  vehicle: any;
}

const rootReducer = combineReducers<StoreState>({
  film: createGeneralReducer('film'),
  species: createGeneralReducer('species'),
  starShip: createGeneralReducer('starShip'),
  vehicle: createGeneralReducer('vehicle'),
  people: createGeneralReducer('people'),
  starShipAnalysis: createAnalysisReducer('starShipAnalysis')
});

export default rootReducer;
