import { ActionTypes } from '../../actions';
import { sampleResponse } from '../../../utils/sampleResponse';
import { createGeneralReducer, initialState } from './generalReducer';

const name = 'film';
const filmReducer = createGeneralReducer(name);

test('stores response from api call', () => {
  const result = filmReducer(initialState, {
    type: ActionTypes.makeApiCall,
    name,
    payload: sampleResponse
  });
  expect(result.allData).toBe(sampleResponse);
});

test('stores correct search term', () => {
  const result = filmReducer(initialState, {
    type: ActionTypes.searchChange,
    name,
    search: 'title',
    payload: 'pirates'
  });
  expect(result.searchTerm).toBe('pirates');
});

test('chage table headers and filters data', () => {
  const result = filmReducer(initialState, {
    type: ActionTypes.changeTableHeaders,
    filteredData: sampleResponse,
    name,
    search: 'title',
    newActiveKeys: ['name']
  });
  expect(result.filteredData).toBe(sampleResponse);
  expect(result.activeDataKeys).toEqual(['name']);
});

test('stores sorted data', () => {
  const result = filmReducer(initialState, {
    type: ActionTypes.sortData,
    sortedArray: sampleResponse,
    lastSorted: 'name',
    name
  });
  expect(result.filteredData).toBe(sampleResponse);
  expect(result.lastSorted).toBe('name');
});
