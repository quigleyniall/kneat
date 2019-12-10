import React from 'react';
import { connect } from 'react-redux';
import {
  makeApiCall,
  calcNumResupplies,
  changeTableHeaders,
  sortAlphabetically,
  sortNummerically,
  sortConsumables,
  reverseSort,
  onSearchChange,
  setLoading,
  findMatches,
  clearSearch,
  ActionTypes
} from '../../store/actions';
import {
  AddRemoveFromTable,
  Page,
  TableWrapper,
  TableRow,
  Heading,
  SearchBar,
  Button
} from '../../components';
import { StoreState } from '../../store/rootReducer';
import { PeopleResponse, PeopleFiltered } from '../../interfaces';

interface IProps {
  store?: any;
  allPeople: PeopleResponse[];
  filteredPeople: PeopleFiltered[];
  lastSorted: string;
  activeTableHeaders: string[];
  allTableHeaders: string[];
  loading: boolean;
  searchTerm: string;
  makeApiCall: Function;
  changeTableHeaders: Function;
  calcNumResupplies: Function;
  sortAlphabetically: Function;
  sortNummerically: Function;
  sortConsumables: Function;
  reverseSort: Function;
  onSearchChange: Function;
  setLoading: Function;
  findMatches: Function;
  clearSearch: Function;
}

interface IState {
  searched: boolean;
}

export class UnconnectedPeople extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { searched: false };
  }

  async componentDidMount() {
    const { allPeople } = this.props;

    if (allPeople.length === 0) {
      this.props.setLoading(true);
      await this.props.makeApiCall('/People', ActionTypes.makePeopleApiCall);
      this.props.setLoading(false);
    }
  }

  search = () => {
    this.props.findMatches(ActionTypes.findPeopleMatches);
    this.setState({ searched: true });
  };

  clearSearch = () => {
    this.props.clearSearch(ActionTypes.clearPeopleSearch);
    this.setState({ searched: false });
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(
      event.target.value,
      ActionTypes.searchPeopleChange
    );
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders, allPeople } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(
      allPeople,
      activeTableHeaders,
      tableHeader,
      ActionTypes.changePeopleTableHeaders
    );
  };

  sortBy = (name: string) => {
    const { filteredPeople, lastSorted } = this.props;

    if (lastSorted === name) {
      return this.props.reverseSort(filteredPeople, ActionTypes.sortPeopleData);
    }
    if (name === 'consumables') {
      return this.props.sortConsumables(
        filteredPeople,
        name,
        ActionTypes.sortPeopleData
      );
    }
    return this.props.sortAlphabetically(
      filteredPeople,
      name,
      ActionTypes.sortPeopleData
    );
  };

  render() {
    const {
      filteredPeople,
      allTableHeaders,
      activeTableHeaders,
      loading,
      searchTerm
    } = this.props;
    const { searched } = this.state;
    return (
      <Page data-test="page" navHeader="Find your favourite People">
        <Heading text="Enter the name of your favourite People" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={searchTerm}
          searchBtnText="Search People"
        />
        {filteredPeople.length > 0 ? (
          <>
            <div className="d-flex">
              <AddRemoveFromTable
                data-test="add-remove-from-table"
                tableHeaders={allTableHeaders}
                checkBoxActive={activeTableHeaders}
                onCheckboxChange={this.onCheckBoxChange}
              />
              {searched && (
                <div className="button-spacing">
                  <Button
                    data-test="clear search"
                    onPress={this.clearSearch}
                    text="Clear Search"
                    btnClass="btn"
                  />
                </div>
              )}
            </div>
            <TableWrapper
              data-test="table-wrapper"
              headers={filteredPeople[0]}
              sortResult={this.sortBy}
            >
              {filteredPeople.map((people, index: number) => (
                <TableRow
                  key={index}
                  data-test="table-results"
                  rowData={people}
                />
              ))}
            </TableWrapper>
          </>
        ) : null}
        {filteredPeople.length === 0 && searched && (
          <>
            <div className="clear-button-spacing">
              <Button
                data-test="clear search"
                onPress={this.clearSearch}
                text="Clear Search"
                btnClass="btn"
              />
            </div>
            <h4>No Results Found</h4>
          </>
        )}
        {loading && (
          <h4 data-test="loading-text">
            Please wait while we reach out to the server!
          </h4>
        )}
      </Page>
    );
  }
}

const mapStateToProps = ({ people, loading }: StoreState) => ({
  allPeople: people.allPeopleData,
  filteredPeople: people.filteredPeopleData,
  lastSorted: people.lastSorted,
  activeTableHeaders: people.activeDataKeys,
  allTableHeaders: people.allResponseKeys,
  loading,
  searchTerm: people.searchTerm
});

const mapDispatchToProps = {
  makeApiCall,
  changeTableHeaders,
  calcNumResupplies,
  sortAlphabetically,
  sortNummerically,
  sortConsumables,
  reverseSort,
  onSearchChange,
  setLoading,
  findMatches,
  clearSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedPeople);
