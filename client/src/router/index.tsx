import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import StarShipAnalysis from '../pages/StarShipAnalysis';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/starship/analysis" component={StarShipAnalysis} />
    </Switch>
  </Router>
);

export default App;
