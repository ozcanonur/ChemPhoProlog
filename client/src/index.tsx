import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from 'reducers';
import App from 'views/App';

import 'style.css';

// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import { persistStore, persistReducer } from 'redux-persist';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// const persistConfig = {
//   key: 'root',
//   storage,
//   stateReconciler: autoMergeLevel2,
//   whitelist: ['selectedKinase', 'selectedPerturbagen', 'extraSidebarRoutes'],
// };
// // WOOP, PERSIST NEEDS TO GET BACK
// //  <PersistGate loading={<p>Loading...</p>} persistor={persistor}></PersistGate>
//
// const persistor = persistStore(store);

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path='/' component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
