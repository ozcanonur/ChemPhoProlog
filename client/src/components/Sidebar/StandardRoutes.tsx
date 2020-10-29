import React from 'react';
import { NavLink } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

import styles from './styles/sidebarStyles';

const useStyles = makeStyles(styles);

interface Props {
  route: {
    path: string;
    name: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    component: () => JSX.Element;
  };
}

const StandardRoute = ({ route }: Props): JSX.Element => {
  const classes = useStyles();

  // Checking if the current route on URL matches this route
  // Assign orange BG if it is
  const listItemClasses =
    window.location.href.indexOf(route.path) > -1
      ? `${classes.itemLink} ${classes.orange}`
      : `${classes.itemLink}`;

  return (
    <NavLink to={route.path} className={classes.item}>
      <ListItem button className={listItemClasses}>
        <route.icon className={classes.itemIcon} />
        <ListItemText
          primary={route.name}
          className={classes.itemText}
          disableTypography
        />
      </ListItem>
    </NavLink>
  );
};

export default StandardRoute;
