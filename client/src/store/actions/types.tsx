import {
  MakeApiCall,
  SearchChange,
  ChangeTableHeaders,
  SortArray,
  NumResupplies,
  Loading
} from './interfaces';

export enum ActionTypes {
  makeApiCall,
  changeTableHeaders,
  calcResupplies,
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
  | Loading;
