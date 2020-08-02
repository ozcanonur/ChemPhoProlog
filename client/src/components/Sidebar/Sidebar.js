/*eslint-disable*/
import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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

  const { color, logo, image, logoText, routes, currentlyInspecting, handleSelectedTabRemove } = props;
  //const [currentlyInspecting, setCurrentlyInspecting] = useState(props.currentlyInspecting);

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
        <NavLink
          to={prop.layout + prop.path}
          className={activePro + classes.item}
          activeClassName='active'
          key={key}
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
      );
    });

  const ExtraRoutes = ({ extraRoutes }) =>
    extraRoutes.map((ele) =>
      ele.map((prop, key) => {
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
                <ListItemText
                  primary={currentTitle}
                  className={classNames(classes.itemText, whiteFontClasses)}
                />
                <RemoveCircleOutlineIcon
                  style={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => handleSelectedTabRemove(currentTitle)}
                />
              </ListItem>
            ) : undefined}
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
          </div>
        );
      })
    );

  var brand = (
    <div className={classes.logo}>
      <a href={'/'} className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        {logoText}
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
          {brand}
          <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
              <StandardRoutes key={'standardRoutes'} />
              <ExtraRoutes key={'extraKinaseRoutes'} extraRoutes={currentlyInspecting.kinase} />
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
          {brand}
          <div className={classes.sidebarWrapper} ref={panel}>
            <List className={classes.list}>
              <StandardRoutes key={'standardRoutes'} />
              <ExtraRoutes key={'extraKinaseRoutes'} extraRoutes={currentlyInspecting.kinase} />
              <ExtraRoutes key={'extraPerturbagenRoutes'} extraRoutes={currentlyInspecting.perturbagen} />
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
