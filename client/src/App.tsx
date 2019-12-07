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
} from './store/actions';
import { Trow } from './components/TableRow/TableRow';
import {
  AddRemoveFromTable,
  Page,
  TableWrapper,
  TableRow,
  Heading,
  SearchBar
} from './components';
import { starShipNummericallyColumns } from './utils/tableHelper';
import { StoreState } from './store/rootReducer';
import { StarShipFiltered } from './interfaces/starship';

class App extends React.Component<any> {
  search = async () => {
    const { allStarShips, activeTableHeaders, distance } = this.props;

    if (allStarShips.length === 0) {
      this.props.setLoading(true);
      await this.props.makeApiCall();
      this.props.setLoading(false);
    }
    this.props.calcNumResupplies(distance, activeTableHeaders);
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(event.target.value);
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(activeTableHeaders, tableHeader);
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
              tableHeaders={allTableHeaders}
              checkBoxActive={activeTableHeaders}
              onCheckboxChange={this.onCheckBoxChange}
            />
            <TableWrapper
              headers={filteredStarShips[0]}
              sortResult={this.sortBy}
            >
              {filteredStarShips.map(
                (ship: { [x: string]: string | number }, index: number) => (
                  <TableRow key={index} data-test="results" rowData={ship} />
                )
              )}
            </TableWrapper>
          </>
        ) : null}
        {loading && <h4>Please wait while we reach out to the server!</h4>}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
