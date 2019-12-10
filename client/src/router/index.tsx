import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import history from './history';
import {
  StarShip,
  Films,
  Species,
  People,
  Vehicles
} from '../containers/GenerateTable';
import StarShipAnalysis from '../containers/StarShipAnalysis/StarShipAnalysis';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/starship" component={StarShip} />
      <Route path="/films" component={Films} />
      <Route path="/species" component={Species} />
      <Route path="/people" component={People} />
      <Route path="/vehicles" component={Vehicles} />
      <Route path="/starship/analysis" component={StarShipAnalysis} />
    </Switch>
  </Router>
);

export default App;
