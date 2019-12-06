import React from 'react';
import axios from 'axios';
import {
  AddRemoveFromTable,
  Page,
  TableWrapper,
  TableRow,
  Heading,
  SearchBar
} from './components';
import { checkTimeToResupply } from './utils/resupply';
import {
  filterObjectKeysInArray,
  starShipFilterKeys
} from './utils/tableHelper';
import {
  sortAlphabetically,
  sortNummerically,
  sortConsumables
} from './utils/sorting';

interface State {
  distance: string;
  starShips: any;
  starShipsFiltered: any;
  lastSorted: string;
  allResponseKeys: string[];
  activeDataKeys: string[];
  loading: boolean;
}

class App extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      allResponseKeys: starShipFilterKeys,
      activeDataKeys: [
        'name',
        'model',
        'consumables',
        'MGLT',
        'number_of_resupplies'
      ],
      lastSorted: '',
      starShipsFiltered: [{}],
      starShips: [],
      loading: false
    };
  }

  getData = async () => {
    this.setState({ loading: true });
    const req = await axios.get('/starships');
    const res = await req.data;
    return this.setState({ starShips: res, loading: false });
  };

  search = async () => {
    const { distance, starShips, activeDataKeys } = this.state;

    if (starShips.length === 0) {
      await this.getData();
    }
    const starShipsWithResupplies = this.state.starShips.map(ship => {
      const { consumables, MGLT } = ship;
      if (consumables === 'unknown' || MGLT === 'unknown') {
        ship.number_of_resupplies = 'unknown';
        return ship;
      }
      const distancePerHour = +distance / MGLT;
      const timeToResupply = checkTimeToResupply(consumables);

      ship.number_of_resupplies = Math.floor(
        distancePerHour / timeToResupply
      ).toString();

      return ship;
    });

    this.setState({
      starShipsFiltered: sortNummerically(
        filterObjectKeysInArray(starShipsWithResupplies, activeDataKeys),
        'number_of_resupplies'
      )
    });
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ distance: event.target.value });
  };

  onCheckBoxChange = event => {
    const { activeDataKeys, starShips } = this.state;
    const filterKey = event.target.value.toString();
    const newActiveKeys = activeDataKeys.includes(filterKey)
      ? activeDataKeys.filter(key => key !== filterKey)
      : activeDataKeys.concat(filterKey);
    this.setState({
      starShipsFiltered: filterObjectKeysInArray(starShips, newActiveKeys),
      activeDataKeys: newActiveKeys
    });
  };

  sortBy = name => {
    const { starShipsFiltered, lastSorted } = this.state;

    const sortNummericallyColumns = [
      'MGLT',
      'cost_in_credits',
      'number_of_resupplies',
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cargo_capacity',
      'hyperdrive_rating'
    ];
    if (lastSorted === name) {
      return this.setState({
        starShipsFiltered: starShipsFiltered.reverse(),
        lastSorted: ''
      });
    }
    if (sortNummericallyColumns.includes(name)) {
      return this.setState({
        starShipsFiltered: sortNummerically(starShipsFiltered, name),
        lastSorted: name
      });
    }
    if (name === 'consumables') {
      sortConsumables(starShipsFiltered, name);
      return this.setState({
        lastSorted: name
      });
    }
    this.setState({
      starShipsFiltered: sortAlphabetically(starShipsFiltered, name),
      lastSorted: name
    });
  };

  render() {
    const {
      starShipsFiltered,
      allResponseKeys,
      activeDataKeys,
      starShips,
      distance,
      loading
    } = this.state;
    return (
      <Page>
        <Heading text="Enter the distance you wish to travel to calculate the number of re-supplies needed" />
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          searching={loading}
          searchTerm={distance}
        />
        {starShips.length > 0 ? (
          <>
            <AddRemoveFromTable
              tableHeaders={allResponseKeys}
              checkBoxActive={activeDataKeys}
              onCheckboxChange={this.onCheckBoxChange}
            />
            <TableWrapper
              headers={starShipsFiltered[0]}
              sortResult={this.sortBy}
            >
              {starShipsFiltered.map((ship, index) => (
                <TableRow key={index} data-test="results" rowData={ship} />
              ))}
            </TableWrapper>
          </>
        ) : null}
        {loading && <h4>Please wait while we reach out to the server!</h4>}
      </Page>
    );
  }
}

export default App;
