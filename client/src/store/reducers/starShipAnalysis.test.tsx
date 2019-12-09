import { ActionTypes } from '../actions';
import starShipReducer, { initialState } from './starShipAnalysis';
import { sampleResponse } from '../../utils/sampleResponse';

test('stores response from api call', () => {
  const result = starShipReducer(initialState, {
    type: ActionTypes.makeApiCall,
    payload: sampleResponse
  });
  expect(result.allStarShipData).toBe(sampleResponse);
});

test('stores correct search term', () => {
  const result = starShipReducer(initialState, {
    type: ActionTypes.searchChange,
    payload: '3000'
  });
  expect(result.distance).toBe('3000');
});

test('chage table headers and filters data', () => {
  const result = starShipReducer(initialState, {
    type: ActionTypes.changeTableHeaders,
    filteredData: sampleResponse,
    newActiveKeys: ['name']
  });
  expect(result.filteredStarShipData).toBe(sampleResponse);
  expect(result.activeDataKeys).toEqual(['name']);
});

test('stores sorted data', () => {
  const result = starShipReducer(initialState, {
    type: ActionTypes.sortData,
    sortedArray: sampleResponse,
    lastSorted: 'name'
  });
  expect(result.filteredStarShipData).toBe(sampleResponse);
  expect(result.lastSorted).toBe('name');
});

test('stores calculated resupplies array', () => {
  const result = starShipReducer(initialState, {
    type: ActionTypes.calcResupplies,
    sortedStarShips: sampleResponse
  });
  expect(result.filteredStarShipData).toEqual(sampleResponse);
});
