import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from 'reducers/';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['kinaseData', 'perturbagenData', 'pathsInspectList', 'pathwayData', 'selectedPath'],
};

export const store = createStore(persistReducer(persistConfig, reducers), composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);
