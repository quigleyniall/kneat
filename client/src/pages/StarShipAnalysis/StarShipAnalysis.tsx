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
  setLoading
} from '../../store/actions';
import {
  AddRemoveFromTable,
  Page,
  TableWrapper,
  TableRow,
  Heading,
  SearchBar
} from '../../components';
import { starShipNummericallyColumns } from '../../utils/tableHelper';
import { StoreState } from '../../store/rootReducer';
import { StarShipResponse, StarShipFiltered } from '../../interfaces/starship';

interface IProps {
  store?: any;
  allStarShips: StarShipResponse[];
  filteredStarShips: StarShipFiltered[];
  lastSorted: string;
  activeTableHeaders: string[];
  allTableHeaders: string[];
  loading: boolean;
  distance: string;
  makeApiCall: Function;
  changeTableHeaders: Function;
  calcNumResupplies: Function;
  sortAlphabetically: Function;
  sortNummerically: Function;
  sortConsumables: Function;
  reverseSort: Function;
  onSearchChange: Function;
  setLoading: Function;
}

export class UnconnectedStarShipAnalysis extends React.Component<IProps> {
  search = async () => {
    const { allStarShips, activeTableHeaders, distance } = this.props;

    if (allStarShips.length === 0) {
      this.props.setLoading(true);
      await this.props.makeApiCall();
      this.props.setLoading(false);
    }

    this.props.calcNumResupplies(
      this.props.allStarShips,
      distance,
      activeTableHeaders
    );
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(event.target.value);
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders, allStarShips } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(
      allStarShips,
      activeTableHeaders,
      tableHeader
    );
  };

  sortBy = (name: string) => {
    const { filteredStarShips, lastSorted } = this.props;

    if (lastSorted === name) {
      return this.props.reverseSort(filteredStarShips);
    }
    if (starShipNummericallyColumns.includes(name)) {
      return this.props.sortNummerically(filteredStarShips, name);
    }
    if (name === 'consumables') {
      return this.props.sortConsumables(filteredStarShips, name);
    }
    return this.props.sortAlphabetically(filteredStarShips, name);
  };

  render() {
    const {
      filteredStarShips,
      allTableHeaders,
      activeTableHeaders,
      loading,
      distance
    } = this.props;
    return (
      <Page
        data-test="page"
        navHeader="Find the perfect Star Ship for your Journey"
        analysisLinks={['Star Ships']}
      >
        <Heading text="Enter the distance you wish to travel to calculate the number of re-supplies needed" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={distance}
        />
        {filteredStarShips.length > 0 ? (
          <>
            <AddRemoveFromTable
              data-test="add-remove-from-table"
              tableHeaders={allTableHeaders}
              checkBoxActive={activeTableHeaders}
              onCheckboxChange={this.onCheckBoxChange}
            />
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
  distance: starShip.distance
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
  setLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedStarShipAnalysis);
