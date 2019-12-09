import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import StarShip from '../pages/StarShips';
import StarShipAnalysis from '../pages/StarShipAnalysis';
import history from './history';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/starship" component={StarShip} />
      <Route path="/starship/analysis" component={StarShipAnalysis} />
    </Switch>
  </Router>
);

export default App;
