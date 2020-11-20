import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { removeSidebarRoute } from 'actions/main';
import styles from './styles/sidebarStyles';

const useStyles = makeStyles(styles);

interface Route {
  path: string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  component: () => JSX.Element;
}

interface TitleProps {
  route: Route;
  expanded: boolean;
  toggleExpand: () => void;
}

const ExtraRouteTitle = ({ route, expanded, toggleExpand }: TitleProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const redirectToDescription = () => {
    if (history.location.pathname !== route.path) {
      history.push(route.path);
      if (!expanded) toggleExpand();
    }
  };

  const currentTitle = route.path.split('/')[1];
  const handleRouteRemove = () => {
    dispatch(removeSidebarRoute(currentTitle));
  };

  return (
    <ListItem className={classes.titleListItem}>
      <RemoveCircleOutlineIcon className={classes.removeIcon} onClick={handleRouteRemove} />
      <ListItemText primary={currentTitle} className={classes.titleItemText} disableTypography onClick={redirectToDescription} />
      {expanded ? (
        <ExpandLessIcon className={classes.expandIcon} onClick={toggleExpand} />
      ) : (
        <ExpandMoreIcon className={classes.expandIcon} onClick={toggleExpand} />
      )}
    </ListItem>
  );
};

interface Props {
  routes: Route[];
}

const ExtraRoutes = ({ routes }: Props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {routes.map((route, index) => {
        const listItemClasses =
          window.location.href.indexOf(route.path) > -1 ? `${classes.itemLink} ${classes.orange}` : `${classes.itemLink}`;

        return (
          <div key={route.path} className={classes.routeContainer}>
            {index === 0 ? <ExtraRouteTitle route={route} expanded={expanded} toggleExpand={toggleExpand} /> : null}
            <Collapse in={expanded} timeout='auto' mountOnEnter unmountOnExit>
              <NavLink to={route.path} className={classes.item}>
                <ListItem button className={listItemClasses}>
                  <route.icon className={classes.itemIcon} />
                  <ListItemText primary={route.name} className={classes.itemText} disableTypography />
                </ListItem>
              </NavLink>
            </Collapse>
          </div>
        );
      })}
    </>
  );
};

export default ExtraRoutes;
