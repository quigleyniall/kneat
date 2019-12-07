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
  activeTableHeaders: string[],
  tableHeader: string
): ChangeTableHeaders => {
  const newActiveKeys = activeTableHeaders.includes(tableHeader)
    ? activeTableHeaders.filter(key => key !== tableHeader)
    : activeTableHeaders.concat(tableHeader);

  return {
    type: ActionTypes.changeTableHeaders,
    payload: newActiveKeys
  };
};

export const calcNumResupplies = (
  distance: string,
  activeDataKeys: string[]
): NumResupplies => ({
  type: ActionTypes.calcResupplies,
  distance,
  activeDataKeys
});

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
