import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { checkTimeToResupply } from '../../utils/resupply';

export interface MakeApiCall {
  type: ActionTypes.makeApiCall;
  payload: any;
}

export interface FilterData {
  type: ActionTypes.changeTableHeaders;
  payload: any;
}

export const setLoading = value => ({
  type: ActionTypes.loading,
  payload: value
});

export const makeApiCall = () => async (dispatch: Dispatch) => {
  const req = await axios.get('/starships');
  const res = await req.data;

  dispatch({
    type: ActionTypes.makeApiCall,
    payload: res
  });
};

export const onDistanceChange = distance => ({
  type: ActionTypes.distanceChange,
  payload: distance
});

export const changeTableHeaders = (activeTableHeaders, tableHeader) => {
  const newActiveKeys = activeTableHeaders.includes(tableHeader)
    ? activeTableHeaders.filter(key => key !== tableHeader)
    : activeTableHeaders.concat(tableHeader);

  return {
    type: ActionTypes.changeTableHeaders,
    payload: newActiveKeys
  };
};

export const calcNumResupplies = (distance, activeDataKeys) => ({
  type: ActionTypes.calcResupplies,
  distance,
  activeDataKeys
});

export const sortAlphabetically = (array, objectKey) => {
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

export const sortNummerically = (array, objectKey) => {
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

export const sortConsumables = (array, objectKey) => {
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

export const reverseSort = array => ({
  type: ActionTypes.sortData,
  sortedArray: array.reverse(),
  lastSorted: ''
});
