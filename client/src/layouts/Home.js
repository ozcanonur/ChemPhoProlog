import React, { useState, createRef, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/dna.jpg';
import logo from 'assets/img/reactlogo.png';

import WelcomePage from 'views/Welcome/Welcome';
import KinaseList from 'views/Lists/KinaseList/KinaseList';
import PerturbagenList from 'views/Lists/PerturbagenList/PerturbagenList';
import AboutUs from 'views/AboutUs/AboutUs.js';
import CallApi from 'api/api';
import { pick } from 'lodash';

let ps;

const useStyles = makeStyles(styles);

export default function Home({ ...rest }) {
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

  const [kinaseData, setKinaseData] = useState([]);
  // Selected kinase info and description dictionary per Uniprot ID
  const [kinaseInfo, setKinaseInfo] = useState('');
  // Right panel open or not
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Only run on first mount
  // Gets the kinases and details and sets the states for them
  useEffect(() => {
    let needCleanUp = true;

    // Get all kinases from DB
    const kinaseQuery =
      'select * from Protein where kinase_name <> "" order by kinase_name';
    CallApi(kinaseQuery).then((res) => {
      if (needCleanUp) {
        // Set the main table body data
        setKinaseData(res);
      }
    });

    // Clean-up
    return () => (needCleanUp = false);
  }, []);

  const handleSelection = (selection) => {
    setRightPanelOpen(true);
    const selectedKinaseDesc = kinaseData.filter(
      (item) => item['kinase_name'] === selection
    );

    setKinaseInfo(selectedKinaseDesc[0]);
  };

  const kinaseTableData = kinaseData
    .map((obj) => pick(obj, ['kinase_name', 'expressed_in', 'uniprot_id']))
    .map(Object.values);

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
                  kinaseInfo={kinaseInfo}
                  handleSelection={handleSelection}
                  rightPanelOpen={rightPanelOpen}
                />
              )}
              key='/home/kinaseList'
            />
            <Route
              path='/home/perturbagenList'
              render={(routeProps) => <PerturbagenList {...routeProps} {...rest} />}
              key='/home/welcoperturbagenListme'
            />
            <Route
              path='/home/aboutUs'
              render={(routeProps) => <AboutUs {...routeProps} {...rest} />}
              key='/home/aboutUs'
            />
            <Route
              path='/home/api'
              render={(routeProps) => <AboutUs {...routeProps} {...rest} />}
              key='/home/api'
            />
            <Redirect from='/' to='/home/welcome' />
          </Switch>
        </div>
      </div>
    </div>
  );
}
