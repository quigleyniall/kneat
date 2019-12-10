import { ActionTypes } from '../../actions';
import { sampleResponse } from '../../../utils/sampleResponse';
import { createAnalysisReducer, initialState } from './analysisReducer';

const name = 'starShip';
const starShipAnalysis = createAnalysisReducer(name);

test('stores response from api call', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.makeApiCall,
    name,
    payload: sampleResponse
  });
  expect(result.allData).toBe(sampleResponse);
});

test('stores correct search term', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.searchChange,
    name,
    search: '',
    payload: '3000'
  });
  expect(result.distance).toBe('3000');
});

test('chage table headers and filters data', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.changeTableHeaders,
    filteredData: sampleResponse,
    name,
    search: '',
    newActiveKeys: ['name']
  });
  expect(result.filteredData).toBe(sampleResponse);
  expect(result.activeDataKeys).toEqual(['name']);
});

test('stores sorted data', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.sortData,
    sortedArray: sampleResponse,
    lastSorted: 'name',
    name
  });
  expect(result.filteredData).toBe(sampleResponse);
  expect(result.lastSorted).toBe('name');
});

test('stores calculated resupplies array', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.calcResupplies,
    sorted: sampleResponse,
    name
  });
  expect(result.filteredData).toEqual(sampleResponse);
});
