/*eslint-disable*/
import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Icon, Collapse, Slide } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';

const useStyles = makeStyles(styles);

const ExtraRoute = ({ ele, color, handleSelectedTabRemove }) => {
  const classes = useStyles();

  // TODO MAKE IT FALSE
  const [open, setOpen] = useState(true);

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  return ele.map((prop, key) => {
    var activePro = ' ';
    var listItemClasses;

    listItemClasses = classNames({
      [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
    });

    const whiteFontClasses = classNames({
      [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
    });

    const currentTitle = prop.path.split('/')[1];

    return (
      <div key={key}>
        {key === 0 ? (
          <ListItem
            key={currentTitle}
            style={{ marginTop: '1em', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <RemoveCircleOutlineIcon
              style={{ color: 'white', cursor: 'pointer', marginLeft: '0.6em' }}
              onClick={() => handleSelectedTabRemove(currentTitle)}
            />
            <ListItemText
              primary={currentTitle}
              className={classNames(classes.itemText, whiteFontClasses)}
              disableTypography={true}
              style={{ textAlign: 'left', marginLeft: '1em' }}
            />
            {open ? (
              <ExpandLessIcon style={{ color: 'white', cursor: 'pointer' }} onClick={handleOpen} />
            ) : (
              <ExpandMoreIcon style={{ color: 'white', cursor: 'pointer' }} onClick={handleOpen} />
            )}
          </ListItem>
        ) : undefined}
        <Collapse in={open} timeout='auto' unmountOnExit>
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
        </Collapse>
      </div>
    );
  });
};

const ExtraRoutes = ({ extraRoutes, color, handleSelectedTabRemove }) => {
  return extraRoutes.map((ele, key) => (
    <Slide in={true} direction='left' key={key} mountOnEnter unmountOnExit>
      <div>
        <ExtraRoute ele={ele} color={color} handleSelectedTabRemove={handleSelectedTabRemove} />
      </div>
    </Slide>
  ));
};

export default ExtraRoutes;
