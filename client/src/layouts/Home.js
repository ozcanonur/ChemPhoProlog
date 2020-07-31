import React, { useState, createRef, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { pick, range, uniqWith, isEqual } from 'lodash';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import baseRoutes from 'routes.js';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import bgImage from 'assets/img/dna.jpg';
import logo from 'assets/img/reactlogo.png';

import WelcomePage from 'views/Welcome/Welcome';
import KinaseList from 'views/Lists/KinaseList/KinaseList';
import PerturbagenList from 'views/Lists/PerturbagenList/PerturbagenList';
import AboutUs from 'views/AboutUs/AboutUs.js';
import CallApi from 'api/api';

import { additionalRoutes } from 'additionalRoutes';

let ps;

const useStyles = makeStyles(styles);

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

  // const handleKinaseSelection = (selection) => {
  //   setKinaseRightPanelOpen(true);

  //   const selectedKinaseDesc = kinaseData.filter(
  //     (item) => item['kinase_name'] === selection
  //   );

  //   setKinaseInfo(selectedKinaseDesc[0]);
  // };

  const kinaseTableData = kinaseData
    .map((obj) => pick(obj, ['kinase_name', 'expressed_in', 'uniprot_id']))
    .map(Object.values);
  //#endregion KINASE TABLE THINGS

  //#region PERTURBAGEN TABLE THINGS
  // List of the data to be displayed on kinase table
  const [perturbagenData, setperturbagenData] = useState([]);
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

  // const handlePerturbagenSelection = (selection) => {
  //   setPerturbagenRightPanelOpen(true);
  //   const selectedPerturbagenDesc = perturbagenData.filter(
  //     (item) => item['name'] === selection
  //   );

  //   setperturbagenInfo(selectedPerturbagenDesc[0]);
  // };

  const perturbagenTableData = perturbagenData.map(Object.values);
  //#endregion PERTURBAGEN TABLE THINGS

  const [routes, setRoutes] = useState(baseRoutes);

  const handlePerturbagenSelection = (selection) => {
    setPerturbagenRightPanelOpen(true);
    const selectedPerturbagenDesc = perturbagenData.filter(
      (item) => item['name'] === selection
    );
    setperturbagenInfo(selectedPerturbagenDesc[0]);

    const detailsRoutes = additionalRoutes(selection).perturbagenDetailsRoutes;
    const newRoutes = uniqWith([...routes, ...detailsRoutes], isEqual);

    setRoutes(newRoutes);
  };

  const handleKinaseSelection = (selection) => {
    setKinaseRightPanelOpen(true);

    const selectedKinaseDesc = kinaseData.filter(
      (item) => item['kinase_name'] === selection
    );
    setKinaseInfo(selectedKinaseDesc[0]);

    // Details sidebar/routes
    const detailsRoutes = additionalRoutes(selection).kinaseDetailsRoutes;
    const newRoutes = uniqWith([...routes, ...detailsRoutes], isEqual);

    setRoutes(newRoutes);
  };

  const handleSelectedTabRemove = (key) => {
    const rangeToBeDeleted = range(key, key + 6, 1);
    const routesCopy = routes.slice();

    while (rangeToBeDeleted.length) {
      routesCopy.splice(rangeToBeDeleted.pop(), 1);
    }

    setRoutes(routesCopy);
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
          <Switch>
            <Route
              path='/home/welcome'
              render={(routeProps) => <WelcomePage {...routeProps} {...rest} />}
              key='/home/welcome'
            />
            <Route
              path='/home/kinaseList'
              render={() => (
                <KinaseList
                  {...rest}
                  tableData={kinaseTableData}
                  selectedInfo={kinaseInfo}
                  handleSelection={handleKinaseSelection}
                  rightPanelOpen={kinaseRightPanelOpen}
                />
              )}
              key='/home/kinaseList'
            />
            <Route
              path='/home/perturbagenList'
              render={() => (
                <PerturbagenList
                  {...rest}
                  tableData={perturbagenTableData}
                  selectedInfo={perturbagenInfo}
                  handleSelection={handlePerturbagenSelection}
                  rightPanelOpen={perturbagenRightPanelOpen}
                />
              )}
              key='/home/perturbagenList'
            />
            <Route
              path='/home/aboutUs'
              render={() => <AboutUs {...rest} />}
              key='/home/aboutUs'
            />
            <Route
              path='/home/api'
              render={() => <AboutUs {...rest} />}
              key='/home/api'
            />

            <Route
              path={`/home/${kinaseInfo.kinase_name}/description`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${kinaseInfo.kinase_name}/description`}
            />
            <Route
              path={`/home/${kinaseInfo.kinase_name}/knownPerturbagens`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${kinaseInfo.kinase_name}/knownPerturbagens`}
            />
            <Route
              path={`/home/${kinaseInfo.kinase_name}/newPerturbagens`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${kinaseInfo.kinase_name}/newPerturbagens`}
            />
            <Route
              path={`/home/${kinaseInfo.kinase_name}/knownSubstrates`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${kinaseInfo.kinase_name}/knownSubstrates`}
            />
            <Route
              path={`/home/${kinaseInfo.kinase_name}/PDTs`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${kinaseInfo.kinase_name}/PDTs`}
            />

            <Route
              path={`/home/${perturbagenInfo.name}/description`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${perturbagenInfo.name}/description`}
            />
            <Route
              path={`/home/${perturbagenInfo.name}/knownTargets`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${perturbagenInfo.name}/knownTargets`}
            />
            <Route
              path={`/home/${perturbagenInfo.name}/newTargets`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${perturbagenInfo.name}/newTargets`}
            />
            <Route
              path={`/home/${perturbagenInfo.name}/observationData`}
              render={() => <AboutUs {...rest} />}
              key={`/home/${perturbagenInfo.name}/observationData`}
            />
            <Redirect from='/' to='/home/welcome' />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
