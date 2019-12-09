import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StarShipAnalysis from '../pages/StarShipAnalysis';

const App = () => (
  <Router>
    <Switch>
      <Route path="/starship/analysis" component={StarShipAnalysis} />
    </Switch>
  </Router>
);

export default App;
