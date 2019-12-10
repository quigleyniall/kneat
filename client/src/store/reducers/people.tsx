import { ActionTypes, Action } from '../actions';
import {
  peopleFilterKeys,
  filterObjectKeysInArray
} from '../../utils/tableHelper';
import { PeopleResponse, PeopleFiltered } from '../../interfaces';

export interface People {
  allPeopleData: PeopleResponse[];
  filteredPeopleData: PeopleFiltered[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  searchTerm: string;
}

export const initialState = {
  allPeopleData: [],
  filteredPeopleData: [],
  lastSorted: '',
  activeDataKeys: peopleFilterKeys,
  allResponseKeys: peopleFilterKeys,
  searchTerm: ''
};

const People = (state: People = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.makePeopleApiCall:
      return {
        ...state,
        allPeopleData: action.payload,
        filteredPeopleData: filterObjectKeysInArray(
          action.payload,
          state.activeDataKeys
        )
      };

    case ActionTypes.searchPeopleChange:
      return { ...state, searchTerm: action.payload };

    case ActionTypes.findPeopleMatches:
      return {
        ...state,
        filteredPeopleData: filterObjectKeysInArray(
          state.allPeopleData.filter(People =>
            People.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          ),
          state.activeDataKeys
        )
      };

    case ActionTypes.clearPeopleSearch:
      return {
        ...state,
        filteredPeopleData: filterObjectKeysInArray(
          state.allPeopleData,
          state.activeDataKeys
        ),
        searchTerm: ''
      };

    case ActionTypes.changePeopleTableHeaders:
      return {
        ...state,
        filteredPeopleData:
          state.searchTerm.length > 0
            ? filterObjectKeysInArray(
                state.allPeopleData.filter(People =>
                  People.name
                    .toLowerCase()
                    .includes(state.searchTerm.toLowerCase())
                ),
                action.newActiveKeys
              )
            : action.filteredData,
        activeDataKeys: action.newActiveKeys
      };

    case ActionTypes.sortPeopleData:
      return {
        ...state,
        filteredPeopleData: action.sortedArray,
        lastSorted: action.lastSorted
      };

    default:
      return state;
  }
};

export default People;
