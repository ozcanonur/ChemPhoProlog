import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import Menu from '@material-ui/icons/Menu';

import AdminNavbarLinks from './AdminNavbarLinks.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();

  function makeBrand() {
    let name;
    let term = '';

    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      if (window.location.href.split('/').length > 5) {
        term = window.location.href.split('/')[4];
      }
      return null;
    });

    return term !== '' ? `${name} for ${term}` : name;
  }

  const { color } = props;

  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
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
              {<AdminNavbarLinks />}
            </Hidden>
            <Hidden mdUp implementation='css'>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={props.handleDrawerToggle}>
                <Menu />
              </IconButton>
            </Hidden>
          </GridItem>
        </GridContainer>
      </Toolbar>
    </AppBar>
  );
}
