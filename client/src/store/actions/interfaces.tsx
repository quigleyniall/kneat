import { ActionTypes } from './types';
import { StarShipResponse, StarShipFiltered } from '../../interfaces/starship';

export interface Loading {
  type: ActionTypes.loading;
  payload: boolean;
}

export interface MakeApiCall {
  type: ActionTypes.makeApiCall;
  payload: StarShipResponse[];
}

export interface ChangeTableHeaders {
  type: ActionTypes.changeTableHeaders;
  newActiveKeys: string[];
  filteredData: StarShipFiltered[];
}

export interface SearchChange {
  type: ActionTypes.searchChange;
  payload: string;
}

export interface NumResupplies {
  type: ActionTypes.calcResupplies;
  sortedStarShips: StarShipFiltered[];
}

export interface SortArray {
  type: ActionTypes.sortData;
  sortedArray: StarShipFiltered[];
  lastSorted: string;
}
