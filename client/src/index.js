import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import Home from 'layouts/Home.js';
import Kinase from 'layouts/Kinase';

import 'assets/css/material-dashboard-react.css?v=1.9.0';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/home' component={Home} />
      <Route path='/kinase' component={Kinase} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
