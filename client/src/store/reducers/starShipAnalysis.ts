import { ActionTypes, Action } from '../actions';
import { starShipAnalysisFilterKeys } from '../../utils/tableHelper';
import { StarShipResponse, StarShipFiltered } from '../../interfaces';

export interface StarShipAnalysis {
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
  allResponseKeys: starShipAnalysisFilterKeys,
  distance: '',
  loading: false
};

const starShipAnalysis = (
  state: StarShipAnalysis = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.makeStarShipApiCall:
      return { ...state, allStarShipData: action.payload };

    case ActionTypes.searchStarShipAnalysisChange:
      return { ...state, distance: action.payload };

    case ActionTypes.changeStarShipAnalysisTableHeaders:
      return {
        ...state,
        filteredStarShipData: action.filteredData,
        activeDataKeys: action.newActiveKeys
      };

    case ActionTypes.sortStarShipAnalysisData:
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

export default starShipAnalysis;
