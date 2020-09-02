import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Menu from '@material-ui/icons/Menu';
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks';
import Button from 'components/CustomButtons/Button';

import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/components/headerStyle';

const useStyles = makeStyles(styles);

const Navbar = ({ routes, handleDrawerToggle }) => {
  const classes = useStyles();

  const makeBrand = () => {
    let name;
    let term = '';

    routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) name = prop.name;
      if (window.location.href.split('/').length > 5) [, , , term] = window.location.href.split('/');
      return null;
    });

    return term !== '' ? `${name} for ${term}` : name;
  };

  const appBarClasses = classNames({
    [` ${classes.blue}`]: 'blue',
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <GridContainer direction='row' justify='space-between' style={{ width: '100%' }}>
          <GridItem>
            <div className={classes.flex}>
              <Button color='transparent' href='#' className={classes.title}>
                {makeBrand() ? makeBrand() : ''}
              </Button>
            </div>
          </GridItem>
          <GridItem>
            <Hidden smDown implementation='css'>
              <AdminNavbarLinks />
            </Hidden>
            <Hidden mdUp implementation='css'>
              <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerToggle}>
                <Menu />
              </IconButton>
            </Hidden>
          </GridItem>
        </GridContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
