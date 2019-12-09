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
  sortConsumables
} from './actions';
import { StarShipFiltered } from '../../interfaces/starship';

describe('test actions with empty store', () => {
  let store: any;
  beforeEach(() => {
    store = storeFactory({});
  });

  describe('set correct loading value', () => {
    test('sets loading to true', () => {
      store.dispatch(setLoading(true));
      const newState = store.getState();
      expect(newState.loading).toBe(true);
    });

    test('sets loading to false', () => {
      store.dispatch(setLoading(false));
      const newState = store.getState();
      expect(newState.loading).toBe(false);
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

      return store.dispatch(makeApiCall()).then(() => {
        const newState = store.getState();
        expect(newState.starShip.allStarShipData).toEqual(sampleResponse);
      });
    });
  });

  test('sets correct search term', () => {
    store.dispatch(onSearchChange('10000'));
    const newState = store.getState();
    expect(newState.starShip.distance).toBe('10000');
  });
});

describe('test actions with sample store', () => {
  let store: any;
  beforeEach(() => {
    store = storeFactory({
      starShip: { allStarShipData: sampleResponse }
    });
  });

  describe('change table headers', () => {
    const activeTableHeaders = ['name', 'model', 'MGLT'];

    test('add table header & check ship data filtered', () => {
      store.dispatch(
        changeTableHeaders(sampleResponse, activeTableHeaders, 'manufacturer')
      );
      const newState = store.getState();
      expect(newState.starShip.activeDataKeys.length).toBe(4);

      const filteredStarShipKeysLength = Object.keys(
        newState.starShip.filteredStarShipData[0]
      ).length;
      expect(filteredStarShipKeysLength).toBe(4);
    });

    test('remove table header', () => {
      store.dispatch(
        changeTableHeaders(sampleResponse, activeTableHeaders, 'model')
      );
      const newState = store.getState();
      expect(newState.starShip.activeDataKeys.length).toBe(2);
    });
  });

  test('calculate number of resupplies', () => {
    store.dispatch(
      calcNumResupplies(sampleResponse, '1000000', [
        'name',
        'model',
        'number_of_resupplies'
      ])
    );
    const newState = store.getState();
    const filtered: StarShipFiltered[] = newState.starShip.filteredStarShipData;
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
      store.dispatch(sortAlphabetically(arrayToBeSorted, 'name'));
      const newState = store.getState();
      expect(newState.starShip.filteredStarShipData).toEqual(sortedByName);
      expect(newState.starShip.lastSorted).toBe('name');

      store.dispatch(reverseSort(sortedByName));
      const updatedState = store.getState();
      expect(updatedState.starShip.filteredStarShipData).toEqual(reverseSorted);
      expect(updatedState.starShip.lastSorted).toBe('');
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
      store.dispatch(sortNummerically(arrayToBeSorted, 'temp'));
      const newState = store.getState();
      expect(newState.starShip.filteredStarShipData).toEqual(sortedByTemp);
      expect(newState.starShip.lastSorted).toBe('temp');

      store.dispatch(reverseSort(sortedByTemp));
      const updatedState = store.getState();
      expect(updatedState.starShip.filteredStarShipData).toEqual(reverseSorted);
      expect(updatedState.starShip.lastSorted).toBe('');
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
      store.dispatch(sortConsumables(arrayToBeSorted, 'consumable'));
      const newState = store.getState();
      expect(newState.starShip.filteredStarShipData).toEqual(
        sortedByConsumable
      );
      expect(newState.starShip.lastSorted).toBe('consumable');

      store.dispatch(reverseSort(sortedByConsumable));
      const updatedState = store.getState();
      expect(updatedState.starShip.filteredStarShipData).toEqual(reverseSorted);
      expect(updatedState.starShip.lastSorted).toBe('');
    });
  });
});
