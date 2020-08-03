/*eslint-disable*/
import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Icon } from '@material-ui/core';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';

const useStyles = makeStyles(styles);

const StandardRoutes = ({ routes, color }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const classes = useStyles();

  return routes.map((prop, key) => {
    var activePro = ' ';
    var listItemClasses;

    listItemClasses = classNames({
      [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
    });

    const whiteFontClasses = classNames({
      [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
    });

    return (
      <div key={key}>
        <NavLink to={prop.layout + prop.path} className={activePro + classes.item} activeClassName='active'>
          <ListItem button className={classes.itemLink + listItemClasses}>
            {typeof prop.icon === 'string' ? (
              <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>{prop.icon}</Icon>
            ) : (
              <prop.icon className={classNames(classes.itemIcon, whiteFontClasses)} />
            )}
            <ListItemText
              primary={prop.name}
              className={classNames(classes.itemText, whiteFontClasses)}
              disableTypography={true}
            />
          </ListItem>
        </NavLink>
      </div>
    );
  });
};

export default StandardRoutes;
