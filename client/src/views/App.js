import React, { useState, createRef, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from 'components/Navbars/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import routes from 'routes';
import additionalRoutes from 'additionalRoutes';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle';

const useStyles = makeStyles(styles);

let ps;

const Home = () => {
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

    return () => {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  const sidebarRoutes = useSelector((state) => state.sidebarRoutes);

  const getExtraRoutes = (type) =>
    sidebarRoutes
      .filter((e) => e.type === type)
      .map((e) => e.name)
      .map((e) => additionalRoutes(type, e));

  const extraKinaseRoutes = getExtraRoutes('kinase');
  const extraPerturbagenRoutes = getExtraRoutes('perturbagen');
  const extraRoutes = [...extraKinaseRoutes, ...extraPerturbagenRoutes].flat();
  const allRoutes = [...extraRoutes, ...routes];

  return (
    <div className={classes.wrapper}>
      <Sidebar handleDrawerToggle={handleDrawerToggle} open={mobileOpen} />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar routes={allRoutes} handleDrawerToggle={handleDrawerToggle} />
        <div className={classes.map}>
          <Switch>
            {routes.map((prop, key) => (
              <Route key={key} path={prop.layout + prop.path} component={prop.component} />
            ))}
            {extraRoutes.map((prop, key) => (
              <Route key={key} path={prop.layout + prop.path} component={prop.component} />
            ))}
            <Redirect from='/' to='/home/welcome' />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
