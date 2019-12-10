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
  makeStarShipApiCall,
  makeFilmApiCall,
  makeSpeciesApiCall,
  makeVehicleApiCall,
  makePeopleApiCall,
  changeStarShipTableHeaders,
  changePeopleTableHeaders,
  changeVehicleTableHeaders,
  changeFilmTableHeaders,
  changeSpeciesTableHeaders,
  changeStarShipAnalysisTableHeaders,
  clearStarShipSearch,
  clearSpeciesSearch,
  clearVehicleSearch,
  clearPeopleSearch,
  clearFilmSearch,
  calcResupplies,
  findStarShipMatches,
  findSpeciesMatches,
  findVehicleMatches,
  findPeopleMatches,
  findFilmMatches,
  sortStarShipAnalysisData,
  sortStarShipData,
  sortFilmData,
  sortSpeciesData,
  sortPeopleData,
  sortVehicleData,
  searchStarShipChange,
  searchSpeciesChange,
  searchVehicleChange,
  searchPeopleChange,
  searchFilmChange,
  searchStarShipAnalysisChange,
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
