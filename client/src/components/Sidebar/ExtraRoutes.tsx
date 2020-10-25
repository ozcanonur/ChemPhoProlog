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

import { removeSidebarRoute } from 'actions/main';
import { useDispatch, useSelector } from 'react-redux';
import additionalRoutes from 'variables/additionalRoutes';

import logo from 'assets/img/reactlogo.png';
import classNames from 'classnames';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'components/Sidebar/sidebarStyle';

const useStyles = makeStyles(styles);

const ExtraRoute = ({ route }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1;
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return route.map((prop, key) => {
    const activePro = ' ';

    const listItemClasses = classNames({
      [` ${classes.orange}`]: activeRoute(prop.layout + prop.path),
    });

    const whiteFontClasses = classNames({
      [` ${classes.whiteFont}`]: activeRoute(prop.layout + prop.path),
    });

    const currentTitle = prop.path.split('/')[1];

    const dispatch = useDispatch();
    const handleSelectedTabRemove = (item) => {
      dispatch(removeSidebarRoute(item));
    };

    return (
      <Slide in={true} key={key} direction='left' mountOnEnter unmountOnExit>
        <div>
          {key === 0 ? (
            <ListItem
              key={currentTitle}
              style={{
                marginTop: '1em',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <RemoveCircleOutlineIcon
                style={{
                  color: 'white',
                  cursor: 'pointer',
                  marginLeft: '0.6em',
                }}
                onClick={() => handleSelectedTabRemove(currentTitle)}
              />
              <ListItemText
                primary={currentTitle}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography
                style={{
                  textAlign: 'left',
                  marginLeft: '1em',
                  cursor: 'pointer',
                }}
                onClick={handleOpen}
              />
              {open ? (
                <ExpandLessIcon
                  style={{ color: 'white', cursor: 'pointer' }}
                  onClick={handleOpen}
                />
              ) : (
                <ExpandMoreIcon
                  style={{ color: 'white', cursor: 'pointer' }}
                  onClick={handleOpen}
                />
              )}
            </ListItem>
          ) : undefined}
          <Collapse in={open} timeout='auto' unmountOnExit>
            <NavLink
              to={prop.layout + prop.path}
              className={activePro + classes.item}
              activeClassName='active'
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === 'string' ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
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
          </Collapse>
        </div>
      </Slide>
    );
  });
};

const ExtraRoutes = ({ type }) => {
  const classes = useStyles();

  const extraSidebarRoutes = useSelector((state) => state.extraSidebarRoutes);
  const getExtraRoutes = (type) =>
    extraSidebarRoutes
      .filter((e) => e.type === type)
      .map((e) => additionalRoutes(type, e.name));
  const extraRoutes = getExtraRoutes(type);

  const brand = (type) => {
    const text = type === 'kinase' ? 'Kinases' : 'Perturbagens';
    return (
      <div className={classes.logo}>
        <a href='# ' className={classNames(classes.logoLink)}>
          <div className={classes.logoImage}>
            <img src={logo} alt='logo' className={classes.img} />
          </div>
          {text}
        </a>
      </div>
    );
  };

  return (
    <Slide
      in={extraRoutes.length !== 0}
      direction='left'
      mountOnEnter
      unmountOnExit
    >
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
