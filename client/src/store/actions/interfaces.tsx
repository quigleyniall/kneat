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
  type:
    | ActionTypes.changeStarShipTableHeaders
    | ActionTypes.changeStarShipAnalysisTableHeaders;
  newActiveKeys: string[];
  filteredData: StarShipFiltered[];
}

export interface SearchChange {
  type:
    | ActionTypes.searchStarShipChange
    | ActionTypes.searchStarShipAnalysisChange;
  payload: string;
}

export interface FindMatches {
  type: ActionTypes.findStarShipMatches;
}

export interface ClearSearch {
  type: ActionTypes.clearStarShipSearch;
}

export interface NumResupplies {
  type: ActionTypes.calcResupplies;
  sortedStarShips: StarShipFiltered[];
}

export interface SortArray {
  type: ActionTypes.sortStarShipData | ActionTypes.sortStarShipAnalysisData;
  sortedArray: StarShipFiltered[];
  lastSorted: string;
}
