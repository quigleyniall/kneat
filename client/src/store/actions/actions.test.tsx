import moxios from 'moxios';
import { storeFactory } from '../../utils/test';
import { sampleResponse } from '../../utils/sampleResponse';
import {
  makeApiCall,
  setLoading,
  onSearchChange,
  changeTableHeaders,
  calcNumResupplies,
  sortAlphabetically,
  reverseSort,
  sortNummerically,
  sortConsumables,
  findMatches,
  clearSearch
} from './actions';
import { StarShipFiltered } from '../../interfaces';

describe('test actions with empty store', () => {
  let store: any;
  beforeEach(() => {
    store = storeFactory({});
  });

  describe('set correct loading value', () => {
    test('sets loading to true', () => {
      store.dispatch(setLoading(true, 'starShipAnalysis'));
      const newState = store.getState();
      expect(newState.starShipAnalysis.loading).toBe(true);
    });

    test('sets loading to false', () => {
      store.dispatch(setLoading(false, 'starShipAnalysis'));
      const newState = store.getState();
      expect(newState.starShipAnalysis.loading).toBe(false);
    });
  });

  describe('searches api', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    test('get response from server', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: sampleResponse
        });
      });

      return store
        .dispatch(makeApiCall('/starships', 'starShipAnalysis'))
        .then(() => {
          const newState = store.getState();
          expect(newState.starShipAnalysis.allData).toEqual(sampleResponse);
        });
    });

    test('returns matches for starships', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: sampleResponse
        });
      });

      store.dispatch(makeApiCall('/starships', 'starShip')).then(() => {
        const newState = store.getState();
        expect(newState.starShip.allData).toEqual(sampleResponse);

        store.dispatch(onSearchChange('y-wing', 'starShip', 'name'));
        store.dispatch(findMatches('starShip', 'name'));

        const upDatedState = store.getState();
        expect(upDatedState.searchTerm).toBe('y-wing');
        expect(upDatedState.filteredData[0].name).toBe('y-wing');

        store.dispatch(clearSearch('starShip'));
        const finalState = store.getState();
        expect(finalState.searchTerm).toBe('');
      });
    });
  });

  test('sets correct search term', () => {
    store.dispatch(onSearchChange('10000', 'starShipAnalysis', 'distance'));
    const newState = store.getState();
    expect(newState.starShipAnalysis.distance).toBe('10000');
  });
});

describe('test actions with sample store', () => {
  let store: any;
  beforeEach(() => {
    store = storeFactory({
      starShipAnalysis: { allData: sampleResponse }
    });
  });

  describe('change table headers', () => {
    const activeTableHeaders = ['name', 'model', 'MGLT'];

    test('add table header & check ship data filtered', () => {
      store.dispatch(
        changeTableHeaders(
          sampleResponse,
          activeTableHeaders,
          'manufacturer',
          'starShipAnalysis',
          'distance'
        )
      );
      const newState = store.getState();
      expect(newState.starShipAnalysis.activeDataKeys.length).toBe(4);

      const filteredStarShipKeysLength = Object.keys(
        newState.starShipAnalysis.filteredData[0]
      ).length;
      expect(filteredStarShipKeysLength).toBe(4);
    });

    test('remove table header', () => {
      store.dispatch(
        changeTableHeaders(
          sampleResponse,
          activeTableHeaders,
          'model',
          'starShipAnalysis',
          'distance'
        )
      );
      const newState = store.getState();
      expect(newState.starShipAnalysis.activeDataKeys.length).toBe(2);
    });
  });

  test('calculate number of resupplies', () => {
    store.dispatch(
      calcNumResupplies(
        sampleResponse,
        '1000000',
        ['name', 'model', 'number_of_resupplies'],
        'starShipAnalysis'
      )
    );
    const newState = store.getState();
    const filtered: StarShipFiltered[] = newState.starShipAnalysis.filteredData;
    const millenniumFalcon = filtered.filter(
      data => data.name === 'Millennium Falcon'
    );
    const yWing = filtered.filter(data => data.name === 'Y-wing');
    const rebelTransport = filtered.filter(
      data => data.name === 'Rebel transport'
    );

    expect(millenniumFalcon[0].number_of_resupplies).toBe('9');
    expect(yWing[0].number_of_resupplies).toBe('74');
    expect(rebelTransport[0].number_of_resupplies).toBe('11');
  });
});

describe('sorting algorithms', () => {
  let store: any;
  beforeEach(() => {
    store = storeFactory({});
  });

  describe('alpahbetically sorting algorithm', () => {
    const arrayToBeSorted = [
      { name: 'Jeff' },
      { name: 'zack' },
      { name: 'hilary' },
      { name: 'jane' }
    ];

    const sortedByName = [
      { name: 'hilary' },
      { name: 'jane' },
      { name: 'Jeff' },
      { name: 'zack' }
    ];

    const reverseSorted = [
      { name: 'zack' },
      { name: 'Jeff' },
      { name: 'jane' },
      { name: 'hilary' }
    ];

    test('sort alphabetically & reverse sort', () => {
      store.dispatch(
        sortAlphabetically(arrayToBeSorted, 'name', 'starShipAnalysis')
      );
      const newState = store.getState();
      expect(newState.starShipAnalysis.filteredData).toEqual(sortedByName);
      expect(newState.starShipAnalysis.lastSorted).toBe('name');

      store.dispatch(reverseSort(sortedByName, 'starShipAnalysis'));
      const updatedState = store.getState();
      expect(updatedState.starShipAnalysis.filteredData).toEqual(reverseSorted);
      expect(updatedState.starShipAnalysis.lastSorted).toBe('');
    });
  });

  describe('nummerical sorting algorithm', () => {
    const arrayToBeSorted = [
      { temp: 200 },
      { temp: 10 },
      { temp: 99 },
      { temp: -8 }
    ];

    const sortedByTemp = [
      { temp: -8 },
      { temp: 10 },
      { temp: 99 },
      { temp: 200 }
    ];

    const reverseSorted = [
      { temp: 200 },
      { temp: 99 },
      { temp: 10 },
      { temp: -8 }
    ];

    test('sort nummerically & reverse sort', () => {
      store.dispatch(
        sortNummerically(arrayToBeSorted, 'temp', 'starShipAnalysis')
      );
      const newState = store.getState();
      expect(newState.starShipAnalysis.filteredData).toEqual(sortedByTemp);
      expect(newState.starShipAnalysis.lastSorted).toBe('temp');

      store.dispatch(reverseSort(sortedByTemp, 'starShipAnalysis'));
      const updatedState = store.getState();
      expect(updatedState.starShipAnalysis.filteredData).toEqual(reverseSorted);
      expect(updatedState.starShipAnalysis.lastSorted).toBe('');
    });
  });

  describe('consumable sorting algorithm', () => {
    const arrayToBeSorted = [
      { consumable: '2 years' },
      { consumable: '1 year' },
      { consumable: '600 days' },
      { consumable: '1 month' },
      { consumable: 'unknown' },
      { consumable: '2 days' },
      { consumable: '5 hours' },
      { consumable: '8 days' },
      { consumable: '6 days' },
      { consumable: '1 week' }
    ];

    const sortedByConsumable = [
      { consumable: '5 hours' },
      { consumable: '2 days' },
      { consumable: '6 days' },
      { consumable: '1 week' },
      { consumable: '8 days' },
      { consumable: '1 month' },
      { consumable: '1 year' },
      { consumable: '600 days' },
      { consumable: '2 years' },
      { consumable: 'unknown' }
    ];

    const reverseSorted = [
      { consumable: 'unknown' },
      { consumable: '2 years' },
      { consumable: '600 days' },
      { consumable: '1 year' },
      { consumable: '1 month' },
      { consumable: '8 days' },
      { consumable: '1 week' },
      { consumable: '6 days' },
      { consumable: '2 days' },
      { consumable: '5 hours' }
    ];

    test('sort nummerically & reverse sort', () => {
      store.dispatch(
        sortConsumables(arrayToBeSorted, 'consumable', 'starShipAnalysis')
      );
      const newState = store.getState();
      expect(newState.starShipAnalysis.filteredData).toEqual(
        sortedByConsumable
      );
      expect(newState.starShipAnalysis.lastSorted).toBe('consumable');

      store.dispatch(reverseSort(sortedByConsumable, 'starShipAnalysis'));
      const updatedState = store.getState();
      expect(updatedState.starShipAnalysis.filteredData).toEqual(reverseSorted);
      expect(updatedState.starShipAnalysis.lastSorted).toBe('');
    });
  });
});
