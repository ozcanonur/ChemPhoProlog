import React, { useState, useEffect, createContext } from 'react';
import { pick, uniqWith } from 'lodash';

import Home from 'views/Home';

import { routes } from 'routes.js';
import { additionalRoutes } from 'additionalRoutes';
import { CallApi } from 'api/api';

import { store } from 'store';
import { Provider } from 'react-redux';

export const AppContext = createContext();

const App = () => {
  // Allows to store the current app state on page refresh
  const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  };

  // Currently added kinases/perturbagens to the sidebar
  const [currentlyInspecting, setCurrentlyInspecting] = useLocalStorage('currentlyInspecting', []);

  // Handle when the user adds a kinase to the sidebar for inspection
  const handleKinaseAdd = (selection) => {
    // Only keep unique
    const uniqCurrentlyInspecting = uniqWith(
      [...currentlyInspecting, { type: 'kinase', name: selection }],
      (x, y) => x.type === y.type && x.name === y.name
    );

    setCurrentlyInspecting(uniqCurrentlyInspecting);
  };

  // Context related to the kinase list
  const kinaseListContext = {
    handleAdd: handleKinaseAdd,
  };

  const handlePerturbagenAdd = (selection) => {
    // Only keep unique
    const uniqCurrentlyInspecting = uniqWith(
      [...currentlyInspecting, { type: 'perturbagen', name: selection }],
      (x, y) => x.type === y.type && x.name === y.name
    );

    setCurrentlyInspecting(uniqCurrentlyInspecting);
  };

  const perturbagenListContext = {
    handleAdd: handlePerturbagenAdd,
  };

  const combinedContext = {
    kinaseListContext: kinaseListContext,
    perturbagenListContext: perturbagenListContext,
  };

  const extraKinaseRoutes = currentlyInspecting
    .filter((e) => e.type === 'kinase')
    .map((e) => e.name)
    .map((e) => additionalRoutes('kinase', e));

  const extraPerturbagenRoutes = currentlyInspecting
    .filter((e) => e.type === 'perturbagen')
    .map((e) => e.name)
    .map((e) => additionalRoutes('perturbagen', e));

  const handleSelectedTabRemove = (name) => {
    setCurrentlyInspecting(currentlyInspecting.filter((e) => e.name !== name));
  };

  const allRoutes = [...[...extraKinaseRoutes, ...extraPerturbagenRoutes].flat(), ...routes];

  const props = {
    routes,
    extraKinaseRoutes,
    extraPerturbagenRoutes,
    handleSelectedTabRemove,
    allRoutes,
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={combinedContext}>
        <Home {...props} />
      </AppContext.Provider>
    </Provider>
  );
};

export default App;
