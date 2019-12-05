import React from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import axios from 'axios';
import { checkResupply } from './utils/resupply';

interface State {
  distance: string;
  starShips: any;
  noOfResults: string | number;
}

class App extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      starShips: [],
      noOfResults: 1
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { noOfResults } = this.state;
    const res = await axios.get(`/starships?page=${noOfResults}`);
    const { data } = await res;
    this.setState({ starShips: data });
  };

  search = () => {
    const { distance, starShips } = this.state;
    const starShipsWithResupplies = starShips.map(ship => {
      const { consumables, MGLT } = ship;
      if (consumables === 'unknown' || MGLT === 'unknown') {
        ship.number_of_resupplies = 'unknown';
        return ship;
      }
      const distancePerHour = +distance / MGLT;
      const timeToResupply = checkResupply(consumables);

      ship.number_of_resupplies = Math.floor(
        distancePerHour / timeToResupply
      ).toString();

      return ship;
    });
    this.setState({ starShips: starShipsWithResupplies });
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ distance: event.target.value });
  };

  setNoResults = async () => {
    await this.setState({ noOfResults: 'all' });
    this.getData();
  };

  renderResults = () => {
    const { starShips } = this.state;
    return starShips.map(ship => (
      <Results data-test="results" starShip={ship} />
    ));
  };

  render() {
    return (
      <div className="App" data-test="app">
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
          setNoResults={this.setNoResults}
        />
        {this.renderResults()}
      </div>
    );
  }
}

export default App;
