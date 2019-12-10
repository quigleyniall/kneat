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
import { starShipNummericallyColumns } from '../../utils/tableHelper';
import { StoreState } from '../../store/rootReducer';
import { StarShipResponse, StarShipFiltered } from '../../interfaces';

interface IProps {
  store?: any;
  allStarShips: StarShipResponse[];
  filteredStarShips: StarShipFiltered[];
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

export class UnconnectedStarShip extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { searched: false };
  }

  async componentDidMount() {
    const { allStarShips } = this.props;

    if (allStarShips.length === 0) {
      this.props.setLoading(true);
      await this.props.makeApiCall(
        '/starships',
        ActionTypes.makeStarShipApiCall
      );
      this.props.setLoading(false);
    }
  }

  search = () => {
    this.props.findMatches(ActionTypes.findStarShipMatches);
    this.setState({ searched: true });
  };

  clearSearch = () => {
    this.props.clearSearch(ActionTypes.clearStarShipSearch);
    this.setState({ searched: false });
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(
      event.target.value,
      ActionTypes.searchStarShipChange
    );
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders, allStarShips } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(
      allStarShips,
      activeTableHeaders,
      tableHeader,
      ActionTypes.changeStarShipTableHeaders
    );
  };

  sortBy = (name: string) => {
    const { filteredStarShips, lastSorted } = this.props;

    if (lastSorted === name) {
      return this.props.reverseSort(
        filteredStarShips,
        ActionTypes.sortStarShipData
      );
    }
    if (starShipNummericallyColumns.includes(name)) {
      return this.props.sortNummerically(
        filteredStarShips,
        name,
        ActionTypes.sortStarShipData
      );
    }
    if (name === 'consumables') {
      return this.props.sortConsumables(
        filteredStarShips,
        name,
        ActionTypes.sortStarShipData
      );
    }
    return this.props.sortAlphabetically(
      filteredStarShips,
      name,
      ActionTypes.sortStarShipData
    );
  };

  render() {
    const {
      filteredStarShips,
      allTableHeaders,
      activeTableHeaders,
      loading,
      searchTerm
    } = this.props;
    const { searched } = this.state;
    return (
      <Page data-test="page" navHeader="Find your favourite Star Ship">
        <Heading text="Enter the name of your favourite star ship" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={searchTerm}
          searchBtnText="Search Star Ships"
        />
        {filteredStarShips.length > 0 ? (
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
              headers={filteredStarShips[0]}
              sortResult={this.sortBy}
            >
              {filteredStarShips.map((ship, index: number) => (
                <TableRow
                  key={index}
                  data-test="table-results"
                  rowData={ship}
                />
              ))}
            </TableWrapper>
          </>
        ) : null}
        {filteredStarShips.length === 0 && searched && (
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

const mapStateToProps = ({ starShip, loading }: StoreState) => ({
  allStarShips: starShip.allStarShipData,
  filteredStarShips: starShip.filteredStarShipData,
  lastSorted: starShip.lastSorted,
  activeTableHeaders: starShip.activeDataKeys,
  allTableHeaders: starShip.allResponseKeys,
  loading,
  searchTerm: starShip.searchTerm
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedStarShip);
