import React, { useState, useEffect, createContext } from 'react';
import { pick, uniqWith } from 'lodash';

import Home from 'views/Home';

import { routes } from 'routes.js';
import { additionalRoutes } from 'additionalRoutes';
import { CallApi } from 'api/api';

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

  //#region KINASE TABLE THINGS
  // All kinase data
  const [kinaseData, setKinaseData] = useState([]);
  // Current page the kinase table is at
  const [kinaseCurrentPage, setKinaseCurrentPage] = useState(0);
  // Selected kinase info and description dictionary per Uniprot ID
  const [kinaseInfo, setKinaseInfo] = useState('');

  // Only run on first mount
  // Gets the kinases and details and sets the states for them
  useEffect(() => {
    // Get all kinases from DB
    const kinaseQuery = 'select * from Protein where kinase_name <> "" order by kinase_name';

    CallApi(kinaseQuery).then((res) => {
      // Set the main table body data
      setKinaseData(res);
    });
  }, []);

  // Only keep these three columns, map to array for table component to interpret
  const kinaseTableData = kinaseData
    .map((e) => pick(e, ['kinase_name', 'expressed_in', 'uniprot_id']))
    .map(Object.values);

  // Handle when a kinase is selected
  const handleKinaseSelection = (selection) => {
    const selectedKinaseDesc = kinaseData.filter((item) => item['kinase_name'] === selection);
    setKinaseInfo(selectedKinaseDesc[0]);
  };

  // Handle when switched to another page on the table
  const kinaseHandleChangePage = (event, newPage) => {
    setKinaseCurrentPage(newPage);
  };

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
    kinaseData: kinaseData,
    tableData: kinaseTableData,
    selectedInfo: kinaseInfo,
    handleSelection: handleKinaseSelection,
    handleAdd: handleKinaseAdd,
    currentPage: kinaseCurrentPage,
    handleChangePage: kinaseHandleChangePage,
  };
  //#endregion KINASE TABLE THINGS

  //#region PERTURBAGEN TABLE THINGS
  // List of the data to be displayed on kinase table
  const [perturbagenData, setperturbagenData] = useState([]);
  // Current page the table is at
  const [perturbagenCurrentPage, setPerturbagenCurrentPage] = useState(0);
  // Selected kinase info and description dictionary per Uniprot ID
  const [perturbagenInfo, setperturbagenInfo] = useState('');

  // Only run on first mount
  // Gets the kinases and details and sets the states for them
  useEffect(() => {
    const apiQuery = 'select * from Perturbagen group by name order by name';
    // Get all kinases from DB
    CallApi(apiQuery).then((res) => {
      // Set the main table body data
      setperturbagenData(res);
    });
  }, []);

  const perturbagenTableData = perturbagenData.map(Object.values);

  const handlePerturbagenSelection = (selection) => {
    const selectedPerturbagenDesc = perturbagenData.filter((item) => item['name'] === selection);
    setperturbagenInfo(selectedPerturbagenDesc[0]);
  };

  const perturbagenHandlePageChange = (event, newPage) => {
    setPerturbagenCurrentPage(newPage);
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
    tableData: perturbagenTableData,
    selectedInfo: perturbagenInfo,
    handleSelection: handlePerturbagenSelection,
    handleAdd: handlePerturbagenAdd,
    currentPage: perturbagenCurrentPage,
    handleChangePage: perturbagenHandlePageChange,
  };
  //#endregion PERTURBAGEN TABLE THINGS

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
    <AppContext.Provider value={combinedContext}>
      <Home {...props} />
    </AppContext.Provider>
  );
};

export default App;
