import { ActionTypes, Action } from '../../actions';
import { filterObjectKeysInArray } from '../../../utils/tableHelper';

export const initialState = {
  allData: [],
  filteredData: [],
  lastSorted: '',
  activeDataKeys: [],
  allResponseKeys: [],
  searchTerm: '',
  loading: false
};

interface State {
  allData: any[];
  filteredData: any[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  searchTerm: string;
  loading: boolean;
}

export function createGeneralReducer(reducerName: string) {
  return function generateTable(state: State = initialState, action: Action) {
    const { name } = action;
    if (name !== reducerName) return state;

    switch (action.type) {
      case ActionTypes.makeApiCall:
        return {
          ...state,
          allData: action.payload,
          filteredData: filterObjectKeysInArray(
            action.payload,
            state.activeDataKeys
          )
        };
      case ActionTypes.loading:
        return {
          ...state,
          loading: action.payload
        };

      case ActionTypes.searchChange:
        return { ...state, searchTerm: action.payload };

      case ActionTypes.findMatches:
        return {
          ...state,
          filteredData: filterObjectKeysInArray(
            state.allData.filter(data =>
              data[action.search]
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
            ),
            state.activeDataKeys
          )
        };

      case ActionTypes.clearSearch:
        return {
          ...state,
          filteredData: filterObjectKeysInArray(
            state.allData,
            state.activeDataKeys
          ),
          searchTerm: ''
        };

      case ActionTypes.changeTableHeaders:
        return {
          ...state,
          filteredData:
            state.searchTerm.length > 0
              ? filterObjectKeysInArray(
                  state.allData.filter(data =>
                    data[action.search]
                      .toLowerCase()
                      .includes(state.searchTerm.toLowerCase())
                  ),
                  action.newActiveKeys
                )
              : action.filteredData,
          activeDataKeys: action.newActiveKeys
        };

      case ActionTypes.sortData:
        return {
          ...state,
          filteredData: action.sortedArray,
          lastSorted: action.lastSorted
        };

      default:
        return state;
    }
  };
}
