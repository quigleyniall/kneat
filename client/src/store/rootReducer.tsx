import { combineReducers } from 'redux';
import starShip from './redcuers/starShip';
import loading from './redcuers/loading';

const rootRedcuer = combineReducers({
  starShip,
  loading
});

export default rootRedcuer;
