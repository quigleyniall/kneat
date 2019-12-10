import { ActionTypes, Action } from '../actions';
import {
  filmFilterKeys,
  filterObjectKeysInArray
} from '../../utils/tableHelper';
import { FilmResponse, FilmFiltered } from '../../interfaces';

export interface Film {
  allFilmData: FilmResponse[];
  filteredFilmData: FilmFiltered[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  searchTerm: string;
}

export const initialState = {
  allFilmData: [],
  filteredFilmData: [],
  lastSorted: '',
  activeDataKeys: [
    'title',
    'episode_id',
    'director',
    'producer',
    'release_date'
  ],
  allResponseKeys: filmFilterKeys,
  searchTerm: ''
};

const Film = (state: Film = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.makeFilmApiCall:
      return {
        ...state,
        allFilmData: action.payload,
        filteredFilmData: filterObjectKeysInArray(
          action.payload,
          state.activeDataKeys
        )
      };

    case ActionTypes.searchFilmChange:
      return { ...state, searchTerm: action.payload };

    case ActionTypes.findFilmMatches:
      return {
        ...state,
        filteredFilmData: filterObjectKeysInArray(
          state.allFilmData.filter(film =>
            film.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          ),
          state.activeDataKeys
        )
      };

    case ActionTypes.clearFilmSearch:
      return {
        ...state,
        filteredFilmData: filterObjectKeysInArray(
          state.allFilmData,
          state.activeDataKeys
        ),
        searchTerm: ''
      };

    case ActionTypes.changeFilmTableHeaders:
      return {
        ...state,
        filteredFilmData:
          state.searchTerm.length > 0
            ? filterObjectKeysInArray(
                state.allFilmData.filter(films =>
                  films.title
                    .toLowerCase()
                    .includes(state.searchTerm.toLowerCase())
                ),
                action.newActiveKeys
              )
            : action.filteredData,
        activeDataKeys: action.newActiveKeys
      };

    case ActionTypes.sortFilmData:
      return {
        ...state,
        filteredFilmData: action.sortedArray,
        lastSorted: action.lastSorted
      };

    default:
      return state;
  }
};

export default Film;
