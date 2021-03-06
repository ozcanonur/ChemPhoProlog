/* eslint-disable prefer-rest-params */
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import Loading from 'components/Misc/Loading/Loading';
import reducers from 'reducers';
import App from 'App';
import 'style.css';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['extraSidebarRoutes'],
};

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
  // @ts-ignore
  persistReducer(persistConfig, reducers),
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

const hist = createBrowserHistory();

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        padding: 0,
      },
    },
    MuiTableCell: {
      root: {
        padding: 0,
      },
    },
    MuiMenuItem: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        transition: 'all .2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderRadius: '50%',
          transform: 'scale(1.15)',
          fill: '#E5AD06',
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Router history={hist}>
          <Switch>
            <Route path='/' component={App} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
