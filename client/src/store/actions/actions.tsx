import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import {
  MakeApiCall,
  SearchChange,
  ChangeTableHeaders,
  SortArray,
  NumResupplies,
  Loading
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

export const onSearchChange = (searchTerm: string): SearchChange => ({
  type: ActionTypes.searchChange,
  payload: searchTerm
});

export const changeTableHeaders = (
  array: any[],
  activeTableHeaders: string[],
  tableHeader: string
): ChangeTableHeaders => {
  const newActiveKeys = activeTableHeaders.includes(tableHeader)
    ? activeTableHeaders.filter(key => key !== tableHeader)
    : activeTableHeaders.concat(tableHeader);

  const filteredData = filterObjectKeysInArray(array, newActiveKeys);

  return {
    type: ActionTypes.changeTableHeaders,
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

export const sortAlphabetically = (
  array: any[],
  objectKey: string
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
    type: ActionTypes.sortData,
    sortedArray,
    lastSorted: objectKey
  };
};

export const sortNummerically = (
  array: any[],
  objectKey: string
): SortArray => {
  const sortedArray = array.sort((a, b) => {
    if (b[objectKey] === 'unknown' || b[objectKey] === 'n/a') {
      return -1;
    }

    return a[objectKey] - b[objectKey];
  });

  return {
    type: ActionTypes.sortData,
    sortedArray,
    lastSorted: objectKey
  };
};

export const sortConsumables = (array: any[], objectKey: string): SortArray => {
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
    type: ActionTypes.sortData,
    sortedArray: array,
    lastSorted: objectKey
  };
};

export const reverseSort = (array: any[]): SortArray => ({
  type: ActionTypes.sortData,
  sortedArray: array.reverse(),
  lastSorted: ''
});
