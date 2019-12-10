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

export const setLoading = (value: boolean, name: string): Loading => ({
  name,
  type: ActionTypes.loading,
  payload: value
});

export const makeApiCall = (url: string, name: string) => async (
  dispatch: Dispatch
) => {
  const req = await axios.get(url);
  const res = await req.data;

  dispatch<MakeApiCall>({
    type: ActionTypes.makeApiCall,
    name,
    payload: res
  });
};

export const onSearchChange = (
  searchTerm: string,
  name: string,
  search: string
): SearchChange => ({
  type: ActionTypes.searchChange,
  name,
  payload: searchTerm,
  search
});

export const changeTableHeaders = (
  array: any[],
  activeTableHeaders: string[],
  tableHeader: string,
  name: string,
  search: string
): ChangeTableHeaders => {
  const newActiveKeys = activeTableHeaders.includes(tableHeader)
    ? activeTableHeaders.filter(key => key !== tableHeader)
    : activeTableHeaders.concat(tableHeader);

  const filteredData = filterObjectKeysInArray(array, newActiveKeys);

  return {
    type: ActionTypes.changeTableHeaders,
    name,
    newActiveKeys,
    filteredData,
    search
  };
};

export const calcNumResupplies = (
  allStarShips: any[],
  distance: string,
  activeDataKeys: string[],
  name: string
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
    name,
    type: ActionTypes.calcResupplies,
    sorted: nummericalSort(starShipsActiveColumns, 'number_of_resupplies')
  };
};

export const findMatches = (name: string, search: string): FindMatches => ({
  type: ActionTypes.findMatches,
  name,
  search
});

export const clearSearch = (name: string): ClearSearch => ({
  type: ActionTypes.clearSearch,
  name
});

export const sortAlphabetically = (
  array: any[],
  objectKey: string,
  name: string
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
    name,
    sortedArray,
    lastSorted: objectKey
  };
};

export const sortNummerically = (
  array: any[],
  objectKey: string,
  name: string
): SortArray => {
  const sortedArray = array.sort((a, b) => {
    if (
      b[objectKey] === 'unknown' ||
      b[objectKey] === 'n/a' ||
      b[objectKey] === 'No Conusmables Available' ||
      b[objectKey] === 'Live Food Tanks Available'
    ) {
      return -1;
    }

    return a[objectKey] - b[objectKey];
  });

  return {
    type: ActionTypes.sortData,
    name,
    sortedArray,
    lastSorted: objectKey
  };
};

export const sortConsumables = (
  array: any[],
  objectKey: string,
  name: string
): SortArray => {
  array.sort((a, b) => {
    if (
      b[objectKey] === 'unknown' ||
      b[objectKey] === 'none' ||
      b[objectKey] === 'Live food tanks' ||
      b[objectKey] === '0'
    ) {
      return -1;
    }

    if (
      a[objectKey] === 'unknown' ||
      a[objectKey] === 'none' ||
      a[objectKey] === 'Live food tanks' ||
      a[objectKey] === '0'
    ) {
      return 1;
    }

    return (
      checkTimeToResupply(a[objectKey]) - checkTimeToResupply(b[objectKey])
    );
  });
  return {
    type: ActionTypes.sortData,
    name,
    sortedArray: array,
    lastSorted: objectKey
  };
};

export const reverseSort = (array: any[], name: string): SortArray => ({
  type: ActionTypes.sortData,
  name,
  sortedArray: array.reverse(),
  lastSorted: ''
});
