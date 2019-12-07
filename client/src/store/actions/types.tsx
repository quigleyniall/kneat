import { MakeApiCall, FilterData } from './actions';

export enum ActionTypes {
  makeApiCall,
  changeTableHeaders,
  calcResupplies,
  sortData,
  distanceChange,
  loading
}

export type Action = MakeApiCall | FilterData;
