import React, { useState, createRef, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routesKinase.js';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/dna.jpg';
import logo from 'assets/img/reactlogo.png';

let ps;

const useStyles = makeStyles(styles);

export default function Home({ ...rest }) {
  const switchRoutes = (
    <Switch>
      {routes(window.location.pathname.split('/')[2]).map((prop, key) => {
        return (
          <Route path={prop.layout + prop.path} key={key} component={prop.component} />
        );
      })}
      <Redirect
        from={`/kinase/${window.location.pathname.split('/')[2]}`}
        to={`/kinase/${window.location.pathname.split('/')[2]}/description`}
      />
    </Switch>
  );

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = createRef();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

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
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes(window.location.pathname.split('/')[2])}
        logoText={'Chemphoprolog'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes(window.location.pathname.split('/')[2])}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
          term={window.location.pathname.split('/')[2]}
        />
        <div className={classes.map}>{switchRoutes}</div>
      </div>
    </div>
  );
}
