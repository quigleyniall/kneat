import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import StarShip from '../pages/StarShips';
import StarShipAnalysis from '../pages/StarShipAnalysis';
import history from './history';
import Films from '../pages/Films';
import Species from '../pages/Species';
import People from '../pages/People';
import Vehicle from '../pages/Vehicles';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/starship" component={StarShip} />
      <Route path="/films" component={Films} />
      <Route path="/species" component={Species} />
      <Route path="/people" component={People} />
      <Route path="/vehicles" component={Vehicle} />
      <Route path="/starship/analysis" component={StarShipAnalysis} />
    </Switch>
  </Router>
);

export default App;
