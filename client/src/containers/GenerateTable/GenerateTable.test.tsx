import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../../utils/test';
import { sampleResponse } from '../../utils/sampleResponse';
import { initialState } from '../../store/initialState';
import { generateTable } from './GenerateTable';
import { filmNummericalColumns } from '../../utils/tableHelper';

describe('redux properties', () => {
  const setup = (state = {}) => {
    const store = storeFactory(state);
    const FilmsTable = generateTable(
      '/films',
      'film',
      filmNummericalColumns,
      'title',
      {
        searchBtnText: 'Search Films',
        header: 'Films'
      }
    );
    const wrapper: any = shallow(
      <FilmsTable url="/films" store={store} header="Films" />
    )
      .dive()
      .dive();
    return wrapper;
  };
  test('has access to action creators', () => {
    const wrapper = setup();
    const makeApiCallProp = wrapper.instance().props.makeApiCall;
    const changeTableHeadersProp = wrapper.instance().props.changeTableHeaders;
    const calcNumResuppliesProp = wrapper.instance().props.calcNumResupplies;
    const sortAlphabeticallyProp = wrapper.instance().props.sortAlphabetically;
    const sortNummericallyProp = wrapper.instance().props.sortNummerically;
    const sortConsumablesProp = wrapper.instance().props.sortConsumables;
    const reverseSortProp = wrapper.instance().props.reverseSort;
    const onSearchChangeProp = wrapper.instance().props.onSearchChange;
    const setLoadingProp = wrapper.instance().props.setLoading;

    expect(makeApiCallProp).toBeInstanceOf(Function);
    expect(changeTableHeadersProp).toBeInstanceOf(Function);
    expect(calcNumResuppliesProp).toBeInstanceOf(Function);
    expect(sortAlphabeticallyProp).toBeInstanceOf(Function);
    expect(sortNummericallyProp).toBeInstanceOf(Function);
    expect(sortConsumablesProp).toBeInstanceOf(Function);
    expect(reverseSortProp).toBeInstanceOf(Function);
    expect(onSearchChangeProp).toBeInstanceOf(Function);
    expect(setLoadingProp).toBeInstanceOf(Function);
  });

  test('has access to redux store', () => {
    const storeState = { film: initialState.film };
    const wrapper = setup(storeState);
    const allDataProp = wrapper.instance().props.allData;
    const filteredDataProp = wrapper.instance().props.filteredData;
    const lastSortedProp = wrapper.instance().props.lastSorted;
    const activeTableHeadersProp = wrapper.instance().props.activeTableHeaders;
    const allTableHeadersProp = wrapper.instance().props.allTableHeaders;
    const loadingProp = wrapper.instance().props.loading;
    const searchTermProp = wrapper.instance().props.searchTerm;

    expect(allDataProp).toEqual(initialState.film.allData);
    expect(filteredDataProp).toEqual(initialState.film.filteredData);
    expect(lastSortedProp).toBe(initialState.film.lastSorted);
    expect(activeTableHeadersProp).toEqual(initialState.film.activeDataKeys);
    expect(allTableHeadersProp).toEqual(initialState.film.allResponseKeys);
    expect(loadingProp).toBe(false);
    expect(searchTermProp).toBe(initialState.film.searchTerm);
  });
});

describe('test table', () => {
  let wrapper: any;

  const props = {
    film: {
      allData: sampleResponse,
      filteredData: sampleResponse,
      lastSorted: '',
      activeTableHeaders: ['name'],
      allTableHeaders: ['name'],
      loading: false,
      searchTerm: ''
    }
  };

  beforeEach(() => {
    const FilmsTable = generateTable(
      '/films',
      'film',
      filmNummericalColumns,
      'title',
      {
        searchBtnText: 'Search Films',
        header: 'Films'
      }
    );
    wrapper = shallow(
      <FilmsTable
        header="film"
        store={storeFactory({ ...props })}
        url="/films"
      />
    )
      .dive()
      .dive();
  });

  test('renders the page', () => {
    const page = findByTestAttr(wrapper, 'page');
    expect(page.length).toBe(1);
  });

  test('renders correct amount of rows', () => {
    const tableRows = findByTestAttr(wrapper, 'table-results');
    expect(tableRows.length).toBe(3);
  });

  test('loading text doesnt appear when loading prop is false', () => {
    const loadingText = findByTestAttr(wrapper, 'loading-text');
    expect(loadingText.length).toBe(0);
  });
});
