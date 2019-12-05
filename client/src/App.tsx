import React from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import axios from 'axios';

interface State {
  searchTerm: string;
  result: [];
}

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      result: []
    };
  }

  search = async () => {
    const res = await axios.get('/starships');
    const { data } = await res;
    console.log(data);
  };

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div className="App" data-test="app">
        <SearchBar
          data-test="search-bar"
          onPress={this.search}
          onSearchChange={this.onSearchChange}
        />
        <Results data-test="results" />
      </div>
    );
  }
}

export default App;
