import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from 'components/Navbars/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

import routes from 'variables/routes';
import additionalRoutes from 'variables/additionalRoutes';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle';

const useStyles = makeStyles(styles);

const Home = () => {
  const classes = useStyles();

  const extraSidebarRoutes = useSelector((state) => state.extraSidebarRoutes);
  const getExtraRoutes = () =>
    extraSidebarRoutes.map(({ type, name }) => additionalRoutes(type, name));
  const allRoutes = [...routes, ...getExtraRoutes().flat()];

  return (
    <div className={classes.wrapper}>
      <Sidebar />
      <div className={classes.mainPanel}>
        <Navbar routes={allRoutes} />
        <div className={classes.map}>
          <Switch>
            {allRoutes.map((prop, key) => (
              <Route key={key} path={prop.path} component={prop.component} />
            ))}
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
