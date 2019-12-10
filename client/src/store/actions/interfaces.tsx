import { ActionTypes } from './types';

export interface Loading {
  type: ActionTypes.loading;
  name: string;
  payload: boolean;
}

export interface MakeApiCall {
  type: ActionTypes.makeApiCall;
  name: string;
  payload: any;
}

export interface ChangeTableHeaders {
  type: ActionTypes.changeTableHeaders;
  name: string;
  newActiveKeys: string[];
  filteredData: any;
  search: string;
}

export interface SearchChange {
  type: ActionTypes.searchChange;
  name: string;
  payload: string;
  search: string;
}

export interface FindMatches {
  type: ActionTypes.findMatches;
  name: string;
  search: string;
}

export interface ClearSearch {
  type: ActionTypes.clearSearch;
  name: string;
}

export interface NumResupplies {
  type: ActionTypes.calcResupplies;
  sorted: any[];
  name: string;
}

export interface SortArray {
  type: ActionTypes.sortData;
  sortedArray: any;
  lastSorted: string;
  name: string;
}
