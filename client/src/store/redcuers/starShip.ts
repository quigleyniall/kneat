import { ActionTypes, Action } from '../actions';
import {
  filterObjectKeysInArray,
  starShipFilterKeys
} from '../../utils/tableHelper';
import { checkTimeToResupply } from '../../utils/resupply';
import { sortNummerically } from '../../utils/sorting';

const initialState = {
  allStarShipData: [],
  filteredStarShipData: [],
  lastSorted: '',
  activeDataKeys: [
    'name',
    'model',
    'consumables',
    'MGLT',
    'number_of_resupplies'
  ],
  allResponseKeys: starShipFilterKeys,
  distance: '',
  loading: false
};

const starShipReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.makeApiCall:
      return { ...state, allStarShipData: action.payload };

    case ActionTypes.distanceChange:
      return { ...state, distance: action.payload };

    case ActionTypes.changeTableHeaders:
      const filteredStarShipData = filterObjectKeysInArray(
        state.allStarShipData,
        action.payload
      );
      return { ...state, filteredStarShipData, activeDataKeys: action.payload };

    case ActionTypes.sortData:
      return {
        ...state,
        filteredStarShipData: action.sortedArray,
        lastSorted: action.lastSorted
      };

    case ActionTypes.calcResupplies:
      const starShipsWithResupplies = state.allStarShipData.map(ship => {
        const { consumables, MGLT } = ship;
        if (consumables === 'unknown' || MGLT === 'unknown') {
          ship.number_of_resupplies = 'unknown';
          return ship;
        }
        const distancePerHour = +action.distance / MGLT;
        const timeToResupply = checkTimeToResupply(consumables);

        ship.number_of_resupplies = Math.floor(
          distancePerHour / timeToResupply
        ).toString();

        return ship;
      });
      const starShipsActiveColumns = filterObjectKeysInArray(
        starShipsWithResupplies,
        action.activeDataKeys
      );
      const sortedStarShips = sortNummerically(
        starShipsActiveColumns,
        'number_of_resupplies'
      );
      return { ...state, filteredStarShipData: sortedStarShips };
    default:
      return state;
  }
};

export default starShipReducer;
