import React, { useState, createRef, useEffect, createContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { pick, uniqWith, range } from 'lodash';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import routes from 'routes.js';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import bgImage from 'assets/img/dna.jpg';
import logo from 'assets/img/reactlogo.png';

import CallApi from 'api/api';

import { additionalRoutes } from 'additionalRoutes';

let ps;

const useStyles = makeStyles(styles);

export const HomeContext = createContext();

const Home = ({ ...rest }) => {
  //#region BASE THINGS
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = createRef();
  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);

    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  //#endregion BASE THINGS

  // Currently added kinases/perturbagens to the sidebar
  const [currentlyInspecting, setCurrentlyInspecting] = useState({
    kinaseRoutes: [],
    perturbagenRoutes: [],
  });

  //#region KINASE TABLE THINGS
  // All kinase data
  const [kinaseData, setKinaseData] = useState([]);
  // Current page the kinase table is at
  const [kinaseCurrentPage, setKinaseCurrentPage] = useState(0);
  // Selected kinase info and description dictionary per Uniprot ID
  const [kinaseInfo, setKinaseInfo] = useState('');
  // Right panel open or not
  const [kinaseRightPanelOpen, setKinaseRightPanelOpen] = useState(false);

  // Only run on first mount
  // Gets the kinases and details and sets the states for them
  useEffect(() => {
    // Get all kinases from DB
    const kinaseQuery =
      'select * from Protein where kinase_name <> "" order by kinase_name';

    CallApi(kinaseQuery).then((res) => {
      // Set the main table body data
      setKinaseData(res);
    });
  }, []);

  // Only keep these three columns, map to array for table component to interpret
  const kinaseTableData = kinaseData
    .map((obj) => pick(obj, ['kinase_name', 'expressed_in', 'uniprot_id']))
    .map(Object.values);

  // Handle when a kinase is selected
  const handleKinaseSelection = (selection) => {
    setKinaseRightPanelOpen(true);

    const selectedKinaseDesc = kinaseData.filter(
      (item) => item['kinase_name'] === selection
    );
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
      [...currentlyInspecting.kinase, selection],
      (x, y) => x === y
    );

    setCurrentlyInspecting({
      perturbagenRoutes: currentlyInspecting.perturbagenRoutes,
      kinaseRoutes: uniqCurrentlyInspecting,
    });
  };

  // Context related to the kinase list
  const kinaseListContext = {
    tableData: kinaseTableData,
    selectedInfo: kinaseInfo,
    rightPanelOpen: kinaseRightPanelOpen,
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
  // Right panel open or not
  const [perturbagenRightPanelOpen, setPerturbagenRightPanelOpen] = useState(false);

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
    setPerturbagenRightPanelOpen(true);
    const selectedPerturbagenDesc = perturbagenData.filter(
      (item) => item['name'] === selection
    );
    setperturbagenInfo(selectedPerturbagenDesc[0]);
  };

  const perturbagenHandlePageChange = (event, newPage) => {
    setPerturbagenCurrentPage(newPage);
  };

  const handlePerturbagenAdd = (selection) => {
    // Only keep unique
    const uniqCurrentlyInspecting = uniqWith(
      [...currentlyInspecting.perturbagen, selection],
      (x, y) => x === y
    );

    setCurrentlyInspecting({
      perturbagenRoutes: uniqCurrentlyInspecting,
      kinaseRoutes: uniqCurrentlyInspecting.kinaseRoutes,
    });
  };

  const perturbagenListContext = {
    tableData: perturbagenTableData,
    selectedInfo: perturbagenInfo,
    rightPanelOpen: perturbagenRightPanelOpen,
    handleSelection: handlePerturbagenSelection,
    handleAdd: handlePerturbagenAdd,
    currentPage: perturbagenCurrentPage,
    handleChangePage: perturbagenHandlePageChange,
  };
  //#endregion PERTURBAGEN TABLE THINGS

  const handleSelectedTabRemove = (key) => {
    const rangeToBeDeleted = range(key, key + 6, 1);
    const routesCopy = routes.slice();

    while (rangeToBeDeleted.length) {
      routesCopy.splice(rangeToBeDeleted.pop(), 1);
    }
    //setRoutes(routesCopy);
  };

  const extraRoutes = currentlyInspecting.kinaseRoutes.map(additionalRoutes);

  const combinedContext = {
    kinaseListContext: kinaseListContext,
    perturbagenListContext: perturbagenListContext,
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        extraRoutes={extraRoutes}
        routes={routes}
        logoText={'ChemPhoProlog'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
        handleSelectedTabRemove={handleSelectedTabRemove}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar routes={routes} handleDrawerToggle={handleDrawerToggle} {...rest} />
        <div className={classes.map}>
          <HomeContext.Provider value={combinedContext}>
            <Switch>
              {routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
              {extraRoutes.map((ele) =>
                ele.map((prop, key) => (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                ))
              )}
              <Redirect from='/' to='/home/welcome' />
            </Switch>
          </HomeContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Home;
