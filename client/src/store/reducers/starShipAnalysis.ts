import { ActionTypes, Action } from '../actions';
import { starShipFilterKeys } from '../../utils/tableHelper';
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

export const initialState = {
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
      return {
        ...state,
        filteredStarShipData: action.filteredData,
        activeDataKeys: action.newActiveKeys
      };

    case ActionTypes.sortData:
      return {
        ...state,
        filteredStarShipData: action.sortedArray,
        lastSorted: action.lastSorted
      };

    case ActionTypes.calcResupplies:
      return { ...state, filteredStarShipData: action.sortedStarShips };
    default:
      return state;
  }
};

export default starShipReducer;
