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
  changeTableHeaders,
  clearSearch,
  calcResupplies,
  findMatches,
  sortData,
  searchChange,
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
