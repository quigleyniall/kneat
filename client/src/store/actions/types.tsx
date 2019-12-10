import {
  MakeApiCall,
  SearchChange,
  ChangeTableHeaders,
  SortArray,
  NumResupplies,
  Loading,
  FindMatches,
  ClearSearch
} from './interfaces';

export enum ActionTypes {
  makeApiCall,
  changeStarShipTableHeaders,
  changeStarShipAnalysisTableHeaders,
  clearStarShipSearch,
  calcResupplies,
  findStarShipMatches,
  sortStarShipData,
  searchStarShipChange,
  searchStarShipAnalysisChange,
  sortStarShipAnalysisData,
  loading
}

export type Action =
  | MakeApiCall
  | SearchChange
  | ChangeTableHeaders
  | SortArray
  | NumResupplies
  | FindMatches
  | ClearSearch
  | Loading;
