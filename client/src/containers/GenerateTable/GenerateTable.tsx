import React from 'react';
import { connect } from 'react-redux';
import {
  AddRemoveFromTable,
  Page,
  TableWrapper,
  TableRow,
  Heading,
  SearchBar,
  Button
} from '../../components';
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
  clearSearch
} from '../../store/actions';

interface IProps {
  store?: any;
  url: string;
  header: string;
  allData: any[];
  filteredData: any[];
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

export const generateTable = (
  url: string,
  name: string,
  nummericalColumns: string[],
  search: string,
  text: { searchBtnText: string; header: string }
) => {
  class TableComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = { searched: false };
    }

    async componentDidMount() {
      const { allData } = this.props;

      if (allData.length === 0) {
        this.props.setLoading(true, name);
        await this.props.makeApiCall(url, name);
        this.props.setLoading(false, name);
      }
    }

    search = () => {
      this.props.findMatches(name, search);
      this.setState({ searched: true });
    };

    clearSearch = () => {
      this.props.clearSearch(name);
      this.setState({ searched: false });
    };

    onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.props.onSearchChange(event.target.value, name, search);
    };

    onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { activeTableHeaders, allData } = this.props;
      const tableHeader = event.target.value.toString();
      this.props.changeTableHeaders(
        allData,
        activeTableHeaders,
        tableHeader,
        name,
        search
      );
    };

    sortBy = (header: string) => {
      const { filteredData, lastSorted } = this.props;

      if (lastSorted === header) {
        return this.props.reverseSort(filteredData, name);
      }
      if (nummericalColumns.includes(header)) {
        return this.props.sortNummerically(filteredData, header, name);
      }
      if (header === 'consumables') {
        return this.props.sortConsumables(filteredData, header, name);
      }
      return this.props.sortAlphabetically(filteredData, header, name);
    };

    render() {
      const {
        filteredData,
        allTableHeaders,
        activeTableHeaders,
        loading,
        searchTerm
      } = this.props;
      const { searched } = this.state;
      return (
        <Page data-test="page" navHeader={`Find your favourite ${text.header}`}>
          <Heading text={`Enter the name of your favourite  ${text.header}`} />
          <SearchBar
            data-test="search-bar"
            onPress={this.search}
            onSearchChange={this.onSearchChange}
            searching={loading}
            searchTerm={searchTerm}
            searchBtnText={text.searchBtnText}
          />
          {filteredData.length > 0 ? (
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
                headers={filteredData[0]}
                sortResult={this.sortBy}
              >
                {filteredData.map((data, index: number) => (
                  <TableRow
                    key={index}
                    data-test="table-results"
                    rowData={data}
                  />
                ))}
              </TableWrapper>
            </>
          ) : null}
          {filteredData.length === 0 && searched && (
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

  const mapStateToProps = state => ({
    allData: state[name].allData,
    filteredData: state[name].filteredData,
    lastSorted: state[name].lastSorted,
    activeTableHeaders: state[name].activeDataKeys,
    allTableHeaders: state[name].allResponseKeys,
    loading: state[name].loading,
    searchTerm: state[name].searchTerm
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

  return connect(mapStateToProps, mapDispatchToProps)(TableComponent);
};
