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
import { filmNummericalColumns } from '../../utils/tableHelper';
import { StoreState } from '../../store/rootReducer';
import { FilmResponse, FilmFiltered } from '../../interfaces';

interface IProps {
  store?: any;
  allFilms: FilmResponse[];
  filteredFilms: FilmFiltered[];
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

export class UnconnectedFilm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { searched: false };
  }

  async componentDidMount() {
    const { allFilms } = this.props;

    if (allFilms.length === 0) {
      this.props.setLoading(true);
      await this.props.makeApiCall('/films', ActionTypes.makeFilmApiCall);
      this.props.setLoading(false);
    }
  }

  search = () => {
    this.props.findMatches(ActionTypes.findFilmMatches);
    this.setState({ searched: true });
  };

  clearSearch = () => {
    this.props.clearSearch(ActionTypes.clearFilmSearch);
    this.setState({ searched: false });
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(event.target.value, ActionTypes.searchFilmChange);
  };

  onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeTableHeaders, allFilms } = this.props;
    const tableHeader = event.target.value.toString();
    this.props.changeTableHeaders(
      allFilms,
      activeTableHeaders,
      tableHeader,
      ActionTypes.changeFilmTableHeaders
    );
  };

  sortBy = (name: string) => {
    const { filteredFilms, lastSorted } = this.props;

    if (lastSorted === name) {
      return this.props.reverseSort(filteredFilms, ActionTypes.sortFilmData);
    }
    if (filmNummericalColumns.includes(name)) {
      return this.props.sortNummerically(
        filteredFilms,
        name,
        ActionTypes.sortFilmData
      );
    }
    if (name === 'consumables') {
      return this.props.sortConsumables(
        filteredFilms,
        name,
        ActionTypes.sortFilmData
      );
    }
    return this.props.sortAlphabetically(
      filteredFilms,
      name,
      ActionTypes.sortFilmData
    );
  };

  render() {
    const {
      filteredFilms,
      allTableHeaders,
      activeTableHeaders,
      loading,
      searchTerm
    } = this.props;
    const { searched } = this.state;
    return (
      <Page data-test="page" navHeader="Find your favourite Film">
        <Heading text="Enter the name of your favourite Film" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={searchTerm}
          searchBtnText="Search Films"
        />
        {filteredFilms.length > 0 ? (
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
              headers={filteredFilms[0]}
              sortResult={this.sortBy}
            >
              {filteredFilms.map((films, index: number) => (
                <TableRow
                  key={index}
                  data-test="table-results"
                  rowData={films}
                />
              ))}
            </TableWrapper>
          </>
        ) : null}
        {filteredFilms.length === 0 && searched && (
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

const mapStateToProps = ({ film, loading }: StoreState) => ({
  allFilms: film.allFilmData,
  filteredFilms: film.filteredFilmData,
  lastSorted: film.lastSorted,
  activeTableHeaders: film.activeDataKeys,
  allTableHeaders: film.allResponseKeys,
  loading,
  searchTerm: film.searchTerm
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

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFilm);
