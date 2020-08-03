/*eslint-disable*/
import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Hidden, List, ListItem, ListItemText, Icon, Collapse, Slide } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';

let ps;
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  //#region BASE THINGS
  const [mobileOpen, setMobileOpen] = useState(false);
  // Perfect Scrollbar solution
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // ref to help us initialize PerfectScrollbar on windows devices
  const panel = createRef();
  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(panel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);

    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [panel]);

  const classes = useStyles();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  //#endregion BASE THINGS

  const {
    color,
    logo,
    image,
    logoText,
    routes,
    currentlyInspecting,
    currentlyInspectingNames,
    handleSelectedTabRemove,
  } = props;

  const StandardRoutes = () =>
    routes.map((prop, key) => {
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

  const ExtraRoute = ({ ele }) => {
    const [open, setOpen] = useState(currentlyInspectingNames.includes(ele[0].path.split('/')[1]));

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
            <ListItem key={currentTitle} style={{ marginTop: '1em', textAlign: 'center' }}>
              <RemoveCircleOutlineIcon
                style={{ color: 'white', cursor: 'pointer' }}
                onClick={() => handleSelectedTabRemove(currentTitle)}
              />
              <ListItemText
                primary={currentTitle}
                className={classNames(classes.itemText, whiteFontClasses)}
                style={{ textAlign: 'left', marginLeft: '3.7em' }}
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
              activeClassName='active'
            >
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

  const ExtraRoutes = ({ extraRoutes }) => {
    return extraRoutes.map((ele, key) => <ExtraRoute ele={ele} key={key} />);
  };

  var brand = (text) => (
    <div className={classes.logo}>
      <a href={'/'} className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        {text}
      </a>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor='right'
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {brand(logoText)}
          <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
              <StandardRoutes key={'standardRoutes'} />
              {currentlyInspecting.kinase.length !== 0 ? brand('Kinases') : undefined}
              <ExtraRoutes key={'extraKinaseRoutes'} extraRoutes={currentlyInspecting.kinase} />
              {currentlyInspecting.perturbagen.length !== 0 ? brand('Perturbagens') : undefined}
              <ExtraRoutes key={'extraPerturbagenRoutes'} extraRoutes={currentlyInspecting.perturbagen} />
            </List>
          </div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          anchor='left'
          variant='permanent'
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand(logoText)}
          <div className={classes.sidebarWrapper} ref={panel}>
            <List className={classes.list}>
              <StandardRoutes />
              <Slide in={currentlyInspecting.kinase.length !== 0} direction='left'>
                <div>
                  {currentlyInspecting.kinase.length !== 0 ? brand('Kinases') : undefined}
                  <ExtraRoutes extraRoutes={currentlyInspecting.kinase} />
                </div>
              </Slide>
              <Slide in={currentlyInspecting.perturbagen.length !== 0} direction='left'>
                <div>
                  {currentlyInspecting.perturbagen.length !== 0 ? brand('Perturbagens') : undefined}
                  <ExtraRoutes extraRoutes={currentlyInspecting.perturbagen} />
                </div>
              </Slide>
            </List>
          </div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
