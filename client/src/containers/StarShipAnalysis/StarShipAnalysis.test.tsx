import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../../utils/test';
import { sampleResponse } from '../../utils/sampleResponse';
import StarShipAnalysis, {
  UnconnectedStarShipAnalysis
} from './StarShipAnalysis';
import { initialState } from '../../store/initialState';

describe('redux properties', () => {
  const setup = (state = {}) => {
    const store = storeFactory(state);
    const wrapper: any = shallow(<StarShipAnalysis store={store} />)
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
    const storeState = { starShipAnalysis: initialState.starShipAnalysis };
    const wrapper = setup(storeState);
    const allDataProp = wrapper.instance().props.allData;
    const filteredDataProp = wrapper.instance().props.filteredData;
    const lastSortedProp = wrapper.instance().props.lastSorted;
    const activeTableHeadersProp = wrapper.instance().props.activeTableHeaders;
    const allTableHeadersProp = wrapper.instance().props.allTableHeaders;
    const loadingProp = wrapper.instance().props.loading;
    const distanceProp = wrapper.instance().props.distance;

    expect(allDataProp).toEqual(initialState.starShipAnalysis.allData);
    expect(filteredDataProp).toEqual(
      initialState.starShipAnalysis.filteredData
    );
    expect(lastSortedProp).toBe(initialState.starShipAnalysis.lastSorted);
    expect(activeTableHeadersProp).toEqual(
      initialState.starShipAnalysis.activeDataKeys
    );
    expect(allTableHeadersProp).toEqual(
      initialState.starShipAnalysis.allResponseKeys
    );
    expect(loadingProp).toBe(false);
    expect(distanceProp).toBe(initialState.starShipAnalysis.distance);
  });
});

describe('unconnected app', () => {
  const onSearchChangeMock = jest.fn();
  const onChangeTableHeadersMock = jest.fn();
  const calcNumResuppliesMock = jest.fn();
  const sortAlphabeticallyMock = jest.fn();

  const props = {
    allData: sampleResponse,
    filteredData: sampleResponse,
    lastSorted: '',
    activeTableHeaders: ['name'],
    allTableHeaders: ['name'],
    loading: false,
    distance: '',
    makeApiCall: Function,
    changeTableHeaders: onChangeTableHeadersMock,
    calcNumResupplies: calcNumResuppliesMock,
    sortAlphabetically: sortAlphabeticallyMock,
    sortNummerically: Function,
    sortConsumables: Function,
    reverseSort: Function,
    onSearchChange: onSearchChangeMock,
    setLoading: Function
  };

  test('renders the page', () => {
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...props} />);
    const page = findByTestAttr(wrapper, 'page');
    expect(page.length).toBe(1);
  });

  test('renders correct amount of rows', () => {
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...props} />);
    const tableRows = findByTestAttr(wrapper, 'table-results');
    expect(tableRows.length).toBe(3);
  });

  test('on search change is called with correct value', () => {
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...props} />);

    const searchBar = findByTestAttr(wrapper, 'search-bar').dive();
    const textInput = findByTestAttr(searchBar, 'text-input').dive();

    textInput.simulate('change', { target: { value: '4000' } });

    expect(onSearchChangeMock.mock.calls.length).toBe(1);
    expect(onSearchChangeMock).toBeCalledWith('4000', 'starShipAnalysis');
  });

  test('runs calcNumResupplies when search button is clicked', () => {
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...props} />);

    const searchBar = findByTestAttr(wrapper, 'search-bar').dive();
    const searchBarButton = findByTestAttr(searchBar, 'search-button').dive();

    searchBarButton.simulate('click');

    expect(calcNumResuppliesMock.mock.calls.length).toBe(1);
  });

  test('on checkbox change is called with correct value', () => {
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...props} />);
    const addRemoveFromTable = findByTestAttr(
      wrapper,
      'add-remove-from-table'
    ).dive();

    const dropdown = findByTestAttr(addRemoveFromTable, 'dropdown').dive();
    const checkBox = findByTestAttr(dropdown, 'dropdown-info')
      .children()
      .first()
      .dive()
      .find('input');
    checkBox.simulate('change', { target: { value: 'name' } });

    expect(onChangeTableHeadersMock.mock.calls.length).toBe(1);
    expect(onChangeTableHeadersMock).toBeCalledWith(
      props.allData,
      props.activeTableHeaders,
      'name',
      'starShipAnalysis'
    );
  });

  test('sort by is run with correct header', () => {
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...props} />);
    const tableWrapper = findByTestAttr(wrapper, 'table-wrapper').dive();
    const firstHeader = tableWrapper.find('th').first();
    firstHeader.simulate('click');

    expect(sortAlphabeticallyMock.mock.calls.length).toBe(1);
    expect(sortAlphabeticallyMock).toBeCalledWith(
      props.filteredData,
      'name',
      'starShipAnalysis'
    );
  });

  test('loading text appears when loading prop is true', () => {
    const setUpProps = { ...props, loading: true };
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...setUpProps} />);

    const loadingText = findByTestAttr(wrapper, 'loading-text');
    expect(loadingText.length).toBe(1);
  });

  test('loading text doesnt appear when loading prop is false', () => {
    const wrapper = shallow(<UnconnectedStarShipAnalysis {...props} />);

    const loadingText = findByTestAttr(wrapper, 'loading-text');
    expect(loadingText.length).toBe(0);
  });
});
