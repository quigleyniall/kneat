import { ActionTypes, Action } from '../actions';
import { checkTimeToResupply } from '../../utils/resupply';
import { sortNummerically } from '../../utils/sorting';
import {
  filterObjectKeysInArray,
  starShipFilterKeys
} from '../../utils/tableHelper';
import { StarShipResponse, StarShipFiltered } from '../../interfaces/starship';

export interface StarShipState {
  allStarShipData: StarShipResponse[];
  filteredStarShipData: StarShipFiltered[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  distance: string;
  loading: boolean;
}

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

const starShipReducer = (
  state: StarShipState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.makeApiCall:
      return { ...state, allStarShipData: action.payload };

    case ActionTypes.searchChange:
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
          // eslint-disable-next-line @typescript-eslint/camelcase
          ship.number_of_resupplies = 'unknown';
          return ship;
        }
        const distancePerHour = +action.distance / +MGLT;
        const timeToResupply = checkTimeToResupply(consumables);

        // eslint-disable-next-line @typescript-eslint/camelcase
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
