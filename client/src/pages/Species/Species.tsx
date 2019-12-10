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
import { SpeciesResponse, SpeciesFiltered } from '../../interfaces';
import { specitesNummericalColumns } from '../../utils/tableHelper';

interface IProps {
  store?: any;
  allSpecies: SpeciesResponse[];
  filteredSpecies: SpeciesFiltered[];
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

export class UnconnectedSpecies extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { searched: false };
  }

  async componentDidMount() {
    const { allSpecies } = this.props;

    if (allSpecies.length === 0) {
      this.props.setLoading(true);
      await this.props.makeApiCall('/species', ActionTypes.makeSpeciesApiCall);
      this.props.setLoading(false);
    }
  }

  search = () => {
    this.props.findMatches(ActionTypes.findSpeciesMatches);
    this.setState({ searched: true });
  };

  clearSearch = () => {
    this.props.clearSearch(ActionTypes.clearSpeciesSearch);
    this.setState({ searched: false });
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(
      event.target.value,
      ActionTypes.searchSpeciesChange
    );
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders, allSpecies } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(
      allSpecies,
      activeTableHeaders,
      tableHeader,
      ActionTypes.changeSpeciesTableHeaders
    );
  };

  sortBy = (name: string) => {
    const { filteredSpecies, lastSorted } = this.props;

    if (lastSorted === name) {
      return this.props.reverseSort(
        filteredSpecies,
        ActionTypes.sortSpeciesData
      );
    }

    if (specitesNummericalColumns.includes(name)) {
      return this.props.sortNummerically(
        filteredSpecies,
        name,
        ActionTypes.sortSpeciesData
      );
    }

    return this.props.sortAlphabetically(
      filteredSpecies,
      name,
      ActionTypes.sortSpeciesData
    );
  };

  render() {
    const {
      filteredSpecies,
      allTableHeaders,
      activeTableHeaders,
      loading,
      searchTerm
    } = this.props;
    const { searched } = this.state;
    return (
      <Page data-test="page" navHeader="Find your favourite Species">
        <Heading text="Enter the name of your favourite Species" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={searchTerm}
          searchBtnText="Search Species"
        />
        {filteredSpecies.length > 0 ? (
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
              headers={filteredSpecies[0]}
              sortResult={this.sortBy}
            >
              {filteredSpecies.map((species, index: number) => (
                <TableRow
                  key={index}
                  data-test="table-results"
                  rowData={species}
                />
              ))}
            </TableWrapper>
          </>
        ) : null}
        {filteredSpecies.length === 0 && searched && (
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

const mapStateToProps = ({ species, loading }: StoreState) => ({
  allSpecies: species.allSpeciesData,
  filteredSpecies: species.filteredSpeciesData,
  lastSorted: species.lastSorted,
  activeTableHeaders: species.activeDataKeys,
  allTableHeaders: species.allResponseKeys,
  loading,
  searchTerm: species.searchTerm
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

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedSpecies);
