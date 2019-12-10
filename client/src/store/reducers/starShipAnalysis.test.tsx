import { ActionTypes } from '../actions';
import starShipAnalysis, { initialState } from './starShipAnalysis';
import { sampleResponse } from '../../utils/sampleResponse';

test('stores response from api call', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.makeStarShipApiCall,
    payload: sampleResponse
  });
  expect(result.allStarShipData).toBe(sampleResponse);
});

test('stores correct search term', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.searchStarShipAnalysisChange,
    payload: '3000'
  });
  expect(result.distance).toBe('3000');
});

test('chage table headers and filters data', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.changeStarShipAnalysisTableHeaders,
    filteredData: sampleResponse,
    newActiveKeys: ['name']
  });
  expect(result.filteredStarShipData).toBe(sampleResponse);
  expect(result.activeDataKeys).toEqual(['name']);
});

test('stores sorted data', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.sortStarShipAnalysisData,
    sortedArray: sampleResponse,
    lastSorted: 'name'
  });
  expect(result.filteredStarShipData).toBe(sampleResponse);
  expect(result.lastSorted).toBe('name');
});

test('stores calculated resupplies array', () => {
  const result = starShipAnalysis(initialState, {
    type: ActionTypes.calcResupplies,
    sortedStarShips: sampleResponse
  });
  expect(result.filteredStarShipData).toEqual(sampleResponse);
});
