import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbars/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';

import routes from 'variables/routes';
import additionalRoutes from 'variables/additionalRoutes';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    width: `calc(100% - 260px)`,
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

const Home = (): JSX.Element => {
  const classes = useStyles();

  const extraSidebarRoutes = useSelector(
    (state: RootState) => state.extraSidebarRoutes
  );

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
            {allRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
