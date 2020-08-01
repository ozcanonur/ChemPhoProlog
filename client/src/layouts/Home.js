import React, { useState, createRef, useEffect, createContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { pick, range, uniqWith } from 'lodash';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import baseRoutes from 'routes.js';

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

  //#region KINASE TABLE THINGS
  const [kinaseData, setKinaseData] = useState([]);
  // Selected kinase info and description dictionary per Uniprot ID
  const [kinaseInfo, setKinaseInfo] = useState('');
  // Right panel open or not
  const [kinaseRightPanelOpen, setKinaseRightPanelOpen] = useState(false);
  // Current page the table is at
  const [kinaseCurrentPage, setKinaseCurrentPage] = useState(0);

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

  const kinaseTableData = kinaseData
    .map((obj) => pick(obj, ['kinase_name', 'expressed_in', 'uniprot_id']))
    .map(Object.values);

  const handleKinaseSelection = (selection) => {
    setKinaseRightPanelOpen(true);

    const selectedKinaseDesc = kinaseData.filter(
      (item) => item['kinase_name'] === selection
    );
    setKinaseInfo(selectedKinaseDesc[0]);
  };

  const handleKinaseAdd = (selection) => {
    // Details sidebar/routes
    const detailsRoutes = additionalRoutes(selection).kinaseDetailsRoutes;

    const newRoutes = uniqWith(
      [...routes, ...detailsRoutes],
      (x, y) => x.path === y.path
    );

    setRoutes(newRoutes);
  };

  const kinaseHandleChangePage = (event, newPage) => {
    setKinaseCurrentPage(newPage);
  };

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
  // Selected kinase info and description dictionary per Uniprot ID
  const [perturbagenInfo, setperturbagenInfo] = useState('');
  // Right panel open or not
  const [perturbagenRightPanelOpen, setPerturbagenRightPanelOpen] = useState(false);
  // Current page the table is at
  const [perturbagenCurrentPage, setPerturbagenCurrentPage] = useState(0);

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

  const handlePerturbagenAdd = (selection) => {
    const detailsRoutes = additionalRoutes(selection).perturbagenDetailsRoutes;
    const newRoutes = uniqWith(
      [...routes, ...detailsRoutes],
      (x, y) => x.path === y.path
    );

    setRoutes(newRoutes);
  };

  const perturbagenHandlePageChange = (event, newPage) => {
    setPerturbagenCurrentPage(newPage);
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

  const [routes, setRoutes] = useState(baseRoutes);

  const handleSelectedTabRemove = (key) => {
    const rangeToBeDeleted = range(key, key + 6, 1);
    const routesCopy = routes.slice();

    while (rangeToBeDeleted.length) {
      routesCopy.splice(rangeToBeDeleted.pop(), 1);
    }
    setRoutes(routesCopy);
  };

  const combinedContext = {
    kinaseListContext: kinaseListContext,
    perturbagenListContext: perturbagenListContext,
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
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
              <Redirect from='/' to='/home/welcome' />
            </Switch>
          </HomeContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Home;
