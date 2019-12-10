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
import { VehicleResponse, VehicleFiltered } from '../../interfaces';

interface IProps {
  store?: any;
  allVehicle: VehicleResponse[];
  filteredVehicle: VehicleFiltered[];
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

export class UnconnectedVehicle extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { searched: false };
  }

  async componentDidMount() {
    const { allVehicle } = this.props;

    if (allVehicle.length === 0) {
      this.props.setLoading(true);
      await this.props.makeApiCall('/vehicles', ActionTypes.makeVehicleApiCall);
      this.props.setLoading(false);
    }
  }

  search = () => {
    this.props.findMatches(ActionTypes.findVehicleMatches);
    this.setState({ searched: true });
  };

  clearSearch = () => {
    this.props.clearSearch(ActionTypes.clearVehicleSearch);
    this.setState({ searched: false });
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(
      event.target.value,
      ActionTypes.searchVehicleChange
    );
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders, allVehicle } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(
      allVehicle,
      activeTableHeaders,
      tableHeader,
      ActionTypes.changeVehicleTableHeaders
    );
  };

  sortBy = (name: string) => {
    const { filteredVehicle, lastSorted } = this.props;

    if (lastSorted === name) {
      return this.props.reverseSort(
        filteredVehicle,
        ActionTypes.sortVehicleData
      );
    }

    if (name === 'consumables') {
      return this.props.sortConsumables(
        filteredVehicle,
        name,
        ActionTypes.sortVehicleData
      );
    }
    return this.props.sortAlphabetically(
      filteredVehicle,
      name,
      ActionTypes.sortVehicleData
    );
  };

  render() {
    const {
      filteredVehicle,
      allTableHeaders,
      activeTableHeaders,
      loading,
      searchTerm
    } = this.props;
    const { searched } = this.state;
    return (
      <Page data-test="page" navHeader="Find your favourite Vehicle">
        <Heading text="Enter the name of your favourite Vehicle" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={searchTerm}
          searchBtnText="Search Vehicle"
        />
        {filteredVehicle.length > 0 ? (
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
              headers={filteredVehicle[0]}
              sortResult={this.sortBy}
            >
              {filteredVehicle.map((Vehicle, index: number) => (
                <TableRow
                  key={index}
                  data-test="table-results"
                  rowData={Vehicle}
                />
              ))}
            </TableWrapper>
          </>
        ) : null}
        {filteredVehicle.length === 0 && searched && (
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

const mapStateToProps = ({ vehicle, loading }: StoreState) => ({
  allVehicle: vehicle.allVehicleData,
  filteredVehicle: vehicle.filteredVehicleData,
  lastSorted: vehicle.lastSorted,
  activeTableHeaders: vehicle.activeDataKeys,
  allTableHeaders: vehicle.allResponseKeys,
  loading,
  searchTerm: vehicle.searchTerm
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

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedVehicle);
