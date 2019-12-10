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
import { starShipNummericalColumns } from '../../utils/tableHelper';

interface IProps {
  store?: any;
  allData: any[];
  filteredData: any[];
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
    const { allData, activeTableHeaders, distance } = this.props;

    if (allData.length === 0) {
      this.props.setLoading(true, 'starShipAnalysis');
      await this.props.makeApiCall('/starShips', 'starShipAnalysis');
      this.props.setLoading(false, 'starShipAnalysis');
    }

    this.props.calcNumResupplies(
      this.props.allData,
      distance,
      activeTableHeaders,
      'starShipAnalysis'
    );
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(event.target.value, 'starShipAnalysis');
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders, allData } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(
      allData,
      activeTableHeaders,
      tableHeader,
      'starShipAnalysis'
    );
  };

  sortBy = (header: string) => {
    const { filteredData, lastSorted } = this.props;

    if (lastSorted === header) {
      return this.props.reverseSort(filteredData, 'starShipAnalysis');
    }
    if (starShipNummericalColumns.includes(header)) {
      return this.props.sortNummerically(
        filteredData,
        header,
        'starShipAnalysis'
      );
    }
    if (header === 'consumables') {
      return this.props.sortConsumables(
        filteredData,
        header,
        'starShipAnalysis'
      );
    }
    return this.props.sortAlphabetically(
      filteredData,
      header,
      'starShipAnalysis'
    );
  };

  render() {
    const {
      filteredData,
      allTableHeaders,
      activeTableHeaders,
      loading,
      distance
    } = this.props;
    return (
      <Page
        data-test="page"
        navHeader={`Find the perfect Star Ship for your Journey`}
      >
        <Heading text="Enter the distance you wish to travel to calculate the number of re-supplies needed" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={distance}
          searchBtnText="Calculate Number of Re-Supplies"
        />
        {filteredData.length > 0 ? (
          <>
            <AddRemoveFromTable
              data-test="add-remove-from-table"
              tableHeaders={allTableHeaders}
              checkBoxActive={activeTableHeaders}
              onCheckboxChange={this.onCheckBoxChange}
            />
            <TableWrapper
              data-test="table-wrapper"
              headers={filteredData[0]}
              sortResult={this.sortBy}
            >
              {filteredData.map((ship, index: number) => (
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

const mapStateToProps = ({ starShipAnalysis }) => ({
  allData: starShipAnalysis.allData,
  filteredData: starShipAnalysis.filteredData,
  lastSorted: starShipAnalysis.lastSorted,
  activeTableHeaders: starShipAnalysis.activeDataKeys,
  allTableHeaders: starShipAnalysis.allResponseKeys,
  loading: starShipAnalysis.loading,
  distance: starShipAnalysis.distance
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
