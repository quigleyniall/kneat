import { ActionTypes, Action } from '../../actions';

export const initialState = {
  allData: [],
  filteredData: [],
  lastSorted: '',
  activeDataKeys: [],
  allResponseKeys: [],
  distance: '',
  loading: false
};

export interface Analysis {
  allData: any[];
  filteredData: any[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  distance: string;
  loading: boolean;
}

export function createAnalysisReducer(reducerName: string) {
  return function generateAnalysisReducer(
    state: Analysis = initialState,
    action: Action
  ) {
    const { name } = action;
    if (name !== reducerName) return state;

    switch (action.type) {
      case ActionTypes.makeApiCall:
        return { ...state, allData: action.payload };

      case ActionTypes.loading:
        return {
          ...state,
          loading: action.payload
        };

      case ActionTypes.searchChange:
        return { ...state, distance: action.payload };

      case ActionTypes.changeTableHeaders:
        return {
          ...state,
          filteredData: action.filteredData,
          activeDataKeys: action.newActiveKeys
        };

      case ActionTypes.sortData:
        return {
          ...state,
          filteredData: action.sortedArray,
          lastSorted: action.lastSorted
        };

      case ActionTypes.calcResupplies:
        return { ...state, filteredData: action.sorted };
      default:
        return state;
    }
  };
}
