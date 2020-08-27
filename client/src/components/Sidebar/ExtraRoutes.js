/*eslint-disable*/
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { removeSidebarRoute } from 'actions/Sidebar/removeSidebarRoute';
import { useDispatch, useSelector } from 'react-redux';
import { additionalRoutes } from 'additionalRoutes';

import logo from 'assets/img/reactlogo.png';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';
const useStyles = makeStyles(styles);

const ExtraRoute = ({ route }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  return route.map((prop, key) => {
    var activePro = ' ';
    var listItemClasses;

    listItemClasses = classNames({
      [' ' + classes['blue']]: activeRoute(prop.layout + prop.path),
    });

    const whiteFontClasses = classNames({
      [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
    });

    const currentTitle = prop.path.split('/')[1];

    const dispatch = useDispatch();
    const handleSelectedTabRemove = (item) => {
      dispatch(removeSidebarRoute(item));
    };

    return (
      <div key={key}>
        {key === 0 ? (
          <ListItem
            key={currentTitle}
            style={{
              marginTop: '1em',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}>
            <RemoveCircleOutlineIcon
              style={{ color: 'white', cursor: 'pointer', marginLeft: '0.6em' }}
              onClick={() => handleSelectedTabRemove(currentTitle)}
            />
            <ListItemText
              primary={currentTitle}
              className={classNames(classes.itemText, whiteFontClasses)}
              disableTypography={true}
              style={{ textAlign: 'left', marginLeft: '1em', cursor: 'pointer' }}
              onClick={handleOpen}
            />
            {open ? (
              <ExpandLessIcon style={{ color: 'white', cursor: 'pointer' }} onClick={handleOpen} />
            ) : (
              <ExpandMoreIcon style={{ color: 'white', cursor: 'pointer' }} onClick={handleOpen} />
            )}
          </ListItem>
        ) : undefined}
        <Collapse in={open} timeout='auto' unmountOnExit>
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName='active'>
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
        </Collapse>
      </div>
    );
  });
};

const ExtraRoutes = ({ type }) => {
  const classes = useStyles();

  const currentlyInspecting = useSelector((state) => state.sidebarRoutes);

  const getExtraRoutes = (type) => {
    return currentlyInspecting
      .filter((e) => e.type === type)
      .map((e) => e.name)
      .map((e) => additionalRoutes(type, e));
  };

  const extraRoutes = getExtraRoutes(type);

  const brand = (type) => {
    const text = type === 'kinase' ? 'Kinases' : 'Perturbagens';

    return (
      <div className={classes.logo}>
        <a href={'# '} className={classNames(classes.logoLink)}>
          <div className={classes.logoImage}>
            <img src={logo} alt='logo' className={classes.img} />
          </div>
          {text}
        </a>
      </div>
    );
  };

  return (
    <Slide in={extraRoutes.length !== 0} direction='left' mountOnEnter unmountOnExit>
      <div style={{ marginTop: '1em', borderTop: '1px solid white' }}>
        {brand(type)}
        {extraRoutes.map((route, key) => (
          <ExtraRoute route={route} key={key} />
        ))}
      </div>
    </Slide>
  );
};

export default ExtraRoutes;
