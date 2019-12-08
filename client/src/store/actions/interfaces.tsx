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
  payload: string[];
}

export interface SearchChange {
  type: ActionTypes.searchChange;
  payload: string;
}

export interface NumResupplies {
  type: ActionTypes.calcResupplies;
  distance: string;
  activeDataKeys: string[];
}

export interface SortArray {
  type: ActionTypes.sortData;
  sortedArray: StarShipFiltered[];
  lastSorted: string;
}
