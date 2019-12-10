import { ActionTypes, Action } from '../actions';
import {
  starShipFilterKeys,
  filterObjectKeysInArray
} from '../../utils/tableHelper';
import { StarShipResponse, StarShipFiltered } from '../../interfaces/starship';

export interface StarShip {
  allStarShipData: StarShipResponse[];
  filteredStarShipData: StarShipFiltered[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  searchTerm: string;
  loading: boolean;
}

export const initialState = {
  allStarShipData: [],
  filteredStarShipData: [],
  lastSorted: '',
  activeDataKeys: ['name', 'model', 'consumables', 'MGLT'],
  allResponseKeys: starShipFilterKeys,
  searchTerm: '',
  loading: false
};

const starShip = (state: StarShip = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.makeApiCall:
      return {
        ...state,
        allStarShipData: action.payload,
        filteredStarShipData: filterObjectKeysInArray(
          action.payload,
          state.activeDataKeys
        )
      };

    case ActionTypes.searchStarShipChange:
      return { ...state, searchTerm: action.payload };

    case ActionTypes.findStarShipMatches:
      return {
        ...state,
        filteredStarShipData: filterObjectKeysInArray(
          state.allStarShipData.filter(ship =>
            ship.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          ),
          state.activeDataKeys
        )
      };

    case ActionTypes.clearStarShipSearch:
      return {
        ...state,
        filteredStarShipData: filterObjectKeysInArray(
          state.allStarShipData,
          state.activeDataKeys
        ),
        searchTerm: ''
      };

    case ActionTypes.changeStarShipTableHeaders:
      return {
        ...state,
        filteredStarShipData:
          state.searchTerm.length > 0
            ? filterObjectKeysInArray(
                state.allStarShipData.filter(ship =>
                  ship.name
                    .toLowerCase()
                    .includes(state.searchTerm.toLowerCase())
                ),
                action.newActiveKeys
              )
            : action.filteredData,
        activeDataKeys: action.newActiveKeys
      };

    case ActionTypes.sortStarShipData:
      return {
        ...state,
        filteredStarShipData: action.sortedArray,
        lastSorted: action.lastSorted
      };

    default:
      return state;
  }
};

export default starShip;
