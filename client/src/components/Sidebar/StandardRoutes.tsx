import React from 'react';
import { NavLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import classNames from 'classnames';
import routes from 'variables/routes';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'components/Sidebar/sidebarStyle';

const useStyles = makeStyles(styles);

const StandardRoutes = () => {
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1;
  };

  const classes = useStyles();

  return routes.map((prop, key) => {
    const activePro = ' ';

    const listItemClasses = classNames({
      [` ${classes.orange}`]: activeRoute(prop.path),
    });

    const whiteFontClasses = classNames({
      [` ${classes.whiteFont}`]: activeRoute(prop.path),
    });

    return (
      <div key={key}>
        <NavLink
          to={prop.path}
          className={activePro + classes.item}
          activeClassName='active'
        >
          <ListItem button className={classes.itemLink + listItemClasses}>
            {typeof prop.icon === 'string' ? (
              <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>
                {prop.icon}
              </Icon>
            ) : (
              <prop.icon
                className={classNames(classes.itemIcon, whiteFontClasses)}
              />
            )}
            <ListItemText
              primary={prop.name}
              className={classNames(classes.itemText, whiteFontClasses)}
              disableTypography
            />
          </ListItem>
        </NavLink>
      </div>
    );
  });
};

export default StandardRoutes;
