import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import Home from 'layouts/Home';

import 'assets/css/material-dashboard-react.css?v=1.9.0';

import ParticlesBg from 'particles-bg';

const hist = createBrowserHistory();

ReactDOM.render(
  <React.Fragment>
    <Router history={hist}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
      </Switch>
    </Router>
    <ParticlesBg type='cobweb' bg={true} />
  </React.Fragment>,
  document.getElementById('root')
);
