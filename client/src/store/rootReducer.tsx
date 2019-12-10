import { combineReducers } from 'redux';
import starShipAnalysis, {
  StarShipAnalysis
} from './reducers/starShipAnalysis';
import starShip, { StarShip } from './reducers/starShip';
import loading from './reducers/loading';
import film, { Film } from './reducers/films';
import species, { Species } from './reducers/species';
import people, { People } from './reducers/people';
import vehicle, { Vehicle } from './reducers/vehicle';

export interface StoreState {
  film: Film;
  starShipAnalysis: StarShipAnalysis;
  starShip: StarShip;
  species: Species;
  people: People;
  vehicle: Vehicle;
  loading: boolean;
}

const rootReducer = combineReducers<StoreState>({
  film,
  starShipAnalysis,
  species,
  starShip,
  loading,
  vehicle,
  people
});

export default rootReducer;
