import { ActionTypes } from './types';

export interface Loading {
  type: ActionTypes.loading;
  payload: boolean;
}

export interface MakeApiCall {
  type: ActionTypes.makeApiCall;
  payload: any;
}

export interface ChangeTableHeaders {
  type: ActionTypes.changeTableHeaders;
  payload: any;
}

export interface SearchChange {
  type: ActionTypes.searchChange;
  payload: string;
}

export interface NumResupplies {
  type: ActionTypes.calcResupplies;
  distance: string;
  activeDataKeys: any;
}

export interface SortArray {
  type: ActionTypes.sortData;
  sortedArray: any;
  lastSorted: string;
}
