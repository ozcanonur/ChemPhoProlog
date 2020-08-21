import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import { store } from 'store';
import { Provider } from 'react-redux';

import App from 'views/App';
import ParticlesBg from 'particles-bg';

import 'assets/css/material-dashboard-react.css?v=1.9.0';

// const whyDidYouRender = require('@welldone-software/why-did-you-render');
// whyDidYouRender(React, {
//   include: [/[A-Z][a-z]/],
// });

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Router history={hist}>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/home' component={App} />
        </Switch>
      </Router>
      <ParticlesBg type='cobweb' bg={true} />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);
