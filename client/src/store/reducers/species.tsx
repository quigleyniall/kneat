import { ActionTypes, Action } from '../actions';
import {
  speciesFilterKeys,
  filterObjectKeysInArray
} from '../../utils/tableHelper';
import { SpeciesResponse, SpeciesFiltered } from '../../interfaces';

export interface Species {
  allSpeciesData: SpeciesResponse[];
  filteredSpeciesData: SpeciesFiltered[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  searchTerm: string;
}

export const initialState = {
  allSpeciesData: [],
  filteredSpeciesData: [],
  lastSorted: '',
  activeDataKeys: speciesFilterKeys,
  allResponseKeys: speciesFilterKeys,
  searchTerm: ''
};

const Species = (state: Species = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.makeSpeciesApiCall:
      return {
        ...state,
        allSpeciesData: action.payload,
        filteredSpeciesData: filterObjectKeysInArray(
          action.payload,
          state.activeDataKeys
        )
      };

    case ActionTypes.searchSpeciesChange:
      return { ...state, searchTerm: action.payload };

    case ActionTypes.findSpeciesMatches:
      return {
        ...state,
        filteredSpeciesData: filterObjectKeysInArray(
          state.allSpeciesData.filter(species =>
            species.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          ),
          state.activeDataKeys
        )
      };

    case ActionTypes.clearSpeciesSearch:
      return {
        ...state,
        filteredSpeciesData: filterObjectKeysInArray(
          state.allSpeciesData,
          state.activeDataKeys
        ),
        searchTerm: ''
      };

    case ActionTypes.changeSpeciesTableHeaders:
      return {
        ...state,
        filteredSpeciesData:
          state.searchTerm.length > 0
            ? filterObjectKeysInArray(
                state.allSpeciesData.filter(species =>
                  species.name
                    .toLowerCase()
                    .includes(state.searchTerm.toLowerCase())
                ),
                action.newActiveKeys
              )
            : action.filteredData,
        activeDataKeys: action.newActiveKeys
      };

    case ActionTypes.sortSpeciesData:
      return {
        ...state,
        filteredSpeciesData: action.sortedArray,
        lastSorted: action.lastSorted
      };

    default:
      return state;
  }
};

export default Species;
