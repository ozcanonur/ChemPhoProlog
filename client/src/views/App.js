import React, { useState, createRef, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { routes } from 'routes.js';
import { additionalRoutes } from 'additionalRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { removeSidebarRoute } from 'actions/Sidebar/removeSidebarRoute';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

let ps;

const Home = () => {
  //#region Misc.
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
  //#endregion Misc.

  const currentlyInspecting = useSelector((state) => state.sidebarRoutes);

  const getExtraRoutes = (type) => {
    return currentlyInspecting
      .filter((e) => e.type === type)
      .map((e) => e.name)
      .map((e) => additionalRoutes(type, e));
  };

  const extraKinaseRoutes = getExtraRoutes('kinase');
  const extraPerturbagenRoutes = getExtraRoutes('perturbagen');

  const dispatch = useDispatch();
  const handleSelectedTabRemove = (item) => {
    dispatch(removeSidebarRoute(item));
  };

  const allRoutes = [...[...extraKinaseRoutes, ...extraPerturbagenRoutes].flat(), ...routes];

  return (
    <div className={classes.wrapper}>
      <Sidebar
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
        routes={routes}
        currentlyInspecting={{ kinase: extraKinaseRoutes, perturbagen: extraPerturbagenRoutes }}
        handleSelectedTabRemove={handleSelectedTabRemove}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar routes={allRoutes} handleDrawerToggle={handleDrawerToggle} />
        <div className={classes.map}>
          <Switch>
            {routes.map((prop, key) => (
              <Route path={prop.layout + prop.path} component={prop.component} key={key} />
            ))}
            {[...extraKinaseRoutes, ...extraPerturbagenRoutes].flat().map((prop, key) => (
              <Route path={prop.layout + prop.path} component={prop.component} key={key} />
            ))}
            <Redirect from='/' to='/home/kinaseList' />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
