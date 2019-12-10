import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
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
import { checkTimeToResupply } from '../../utils/resupply';
import { sortNummerically as nummericalSort } from '../../utils/sorting';
import { filterObjectKeysInArray } from '../../utils/tableHelper';

export const setLoading = (value: boolean): Loading => ({
  type: ActionTypes.loading,
  payload: value
});

export const makeApiCall = () => async (dispatch: Dispatch) => {
  const req = await axios.get('/starships');
  const res = await req.data;

  dispatch<MakeApiCall>({
    type: ActionTypes.makeApiCall,
    payload: res
  });
};

export const onSearchChange = (
  searchTerm: string,
  ActionType:
    | ActionTypes.searchStarShipChange
    | ActionTypes.searchStarShipAnalysisChange
): SearchChange => ({
  type: ActionType,
  payload: searchTerm
});

export const changeTableHeaders = (
  array: any[],
  activeTableHeaders: string[],
  tableHeader: string,
  ActionType:
    | ActionTypes.changeStarShipTableHeaders
    | ActionTypes.changeStarShipAnalysisTableHeaders
): ChangeTableHeaders => {
  const newActiveKeys = activeTableHeaders.includes(tableHeader)
    ? activeTableHeaders.filter(key => key !== tableHeader)
    : activeTableHeaders.concat(tableHeader);

  const filteredData = filterObjectKeysInArray(array, newActiveKeys);

  return {
    type: ActionType,
    newActiveKeys,
    filteredData
  };
};

export const calcNumResupplies = (
  allStarShips: any[],
  distance: string,
  activeDataKeys: string[]
): NumResupplies => {
  const starShipsWithResupplies = allStarShips.map(ship => {
    const { consumables, MGLT } = ship;
    if (consumables === 'unknown' || MGLT === 'unknown') {
      // eslint-disable-next-line @typescript-eslint/camelcase
      ship.number_of_resupplies = 'unknown';
      return ship;
    }
    const distancePerHour = +distance / +MGLT;
    const timeToResupply = checkTimeToResupply(consumables);

    // eslint-disable-next-line @typescript-eslint/camelcase
    ship.number_of_resupplies = Math.floor(
      distancePerHour / timeToResupply
    ).toString();

    return ship;
  });
  const starShipsActiveColumns = filterObjectKeysInArray(
    starShipsWithResupplies,
    activeDataKeys
  );

  return {
    type: ActionTypes.calcResupplies,
    sortedStarShips: nummericalSort(
      starShipsActiveColumns,
      'number_of_resupplies'
    )
  };
};

export const findMatches = (
  ActionType: ActionTypes.findStarShipMatches
): FindMatches => ({
  type: ActionType
});

export const clearSearch = (
  Action: ActionTypes.clearStarShipSearch
): ClearSearch => ({
  type: Action
});

export const sortAlphabetically = (
  array: any[],
  objectKey: string,
  ActionType:
    | ActionTypes.sortStarShipAnalysisData
    | ActionTypes.sortStarShipData
): SortArray => {
  const sortedArray = array.sort((a, b) => {
    if (a[objectKey].toLowerCase() < b[objectKey].toLowerCase()) {
      return -1;
    }
    if (a[objectKey].toLowerCase() > b[objectKey].toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return {
    type: ActionType,
    sortedArray,
    lastSorted: objectKey
  };
};

export const sortNummerically = (
  array: any[],
  objectKey: string,
  ActionType:
    | ActionTypes.sortStarShipAnalysisData
    | ActionTypes.sortStarShipData
): SortArray => {
  const sortedArray = array.sort((a, b) => {
    if (b[objectKey] === 'unknown' || b[objectKey] === 'n/a') {
      return -1;
    }

    return a[objectKey] - b[objectKey];
  });

  return {
    type: ActionType,
    sortedArray,
    lastSorted: objectKey
  };
};

export const sortConsumables = (
  array: any[],
  objectKey: string,
  ActionType:
    | ActionTypes.sortStarShipAnalysisData
    | ActionTypes.sortStarShipData
): SortArray => {
  array.sort((a, b) => {
    if (b[objectKey] === 'unknown') {
      return -1;
    }

    if (a[objectKey] === 'unknown') {
      return 1;
    }

    return (
      checkTimeToResupply(a[objectKey]) - checkTimeToResupply(b[objectKey])
    );
  });
  return {
    type: ActionType,
    sortedArray: array,
    lastSorted: objectKey
  };
};

export const reverseSort = (
  array: any[],
  ActionType:
    | ActionTypes.sortStarShipAnalysisData
    | ActionTypes.sortStarShipData
): SortArray => ({
  type: ActionType,
  sortedArray: array.reverse(),
  lastSorted: ''
});
