/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';

import routes from 'variables/standardRoutes';
import additionalRoutes from 'variables/generateSubRoutes';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    width: `calc(100% - 240px)`,
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    transition: 'all .2s ease-in-out',
    maxHeight: '100%',
    overflowScrolling: 'touch',
  },
  map: {
    marginTop: '70px',
    overflow: 'hidden',
  },
});

const App = () => {
  const classes = useStyles();

  const extraSidebarRoutes = useSelector((state: RootState) => state.extraSidebarRoutes);
  const getExtraRoutes = () => extraSidebarRoutes.map((e) => additionalRoutes(e));

  const allRoutes = [...routes, ...getExtraRoutes().flat()];

  return (
    <div className={classes.wrapper}>
      <Sidebar />
      <div className={classes.mainPanel} id='mainPanel'>
        {/* @ts-ignore */}
        <Navbar routes={allRoutes} />
        <div className={classes.map}>
          <Switch>
            {allRoutes.map((route) => (
              <Route key={route.path} path={route.path} component={route.component} />
            ))}
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
