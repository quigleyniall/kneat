import { ActionTypes } from './types';

export interface Loading {
  type: ActionTypes.loading;
  payload: boolean;
}

export interface MakeApiCall {
  type: ApiCallType;
  payload: any;
}

export interface ChangeTableHeaders {
  type: ChangeTableHeadersType;
  newActiveKeys: string[];
  filteredData: any;
}

export interface SearchChange {
  type: SearchChangeType;
  payload: string;
}

export interface FindMatches {
  type: FindMatchesType;
}

export interface ClearSearch {
  type: ClearSearchType;
}

export interface NumResupplies {
  type: ActionTypes.calcResupplies;
  sortedStarShips: any[];
}

export interface SortArray {
  type: SortArrayType;
  sortedArray: any;
  lastSorted: string;
}

// action creator types
export type ApiCallType =
  | ActionTypes.makeFilmApiCall
  | ActionTypes.makeStarShipApiCall
  | ActionTypes.makeSpeciesApiCall
  | ActionTypes.makePeopleApiCall
  | ActionTypes.makeVehicleApiCall;

export type SearchChangeType =
  | ActionTypes.searchStarShipChange
  | ActionTypes.searchStarShipAnalysisChange
  | ActionTypes.searchFilmChange
  | ActionTypes.searchSpeciesChange
  | ActionTypes.searchVehicleChange
  | ActionTypes.searchPeopleChange;

export type ChangeTableHeadersType =
  | ActionTypes.changeStarShipTableHeaders
  | ActionTypes.changeStarShipAnalysisTableHeaders
  | ActionTypes.changeFilmTableHeaders
  | ActionTypes.changeSpeciesTableHeaders
  | ActionTypes.changeVehicleTableHeaders
  | ActionTypes.changePeopleTableHeaders;

export type FindMatchesType =
  | ActionTypes.findStarShipMatches
  | ActionTypes.findFilmMatches
  | ActionTypes.findSpeciesMatches
  | ActionTypes.findVehicleMatches
  | ActionTypes.findPeopleMatches;

export type ClearSearchType =
  | ActionTypes.clearStarShipSearch
  | ActionTypes.clearSpeciesSearch
  | ActionTypes.clearFilmSearch
  | ActionTypes.clearPeopleSearch
  | ActionTypes.clearVehicleSearch;

export type SortArrayType =
  | ActionTypes.sortStarShipData
  | ActionTypes.sortStarShipAnalysisData
  | ActionTypes.sortFilmData
  | ActionTypes.sortSpeciesData
  | ActionTypes.sortVehicleData
  | ActionTypes.sortPeopleData;
