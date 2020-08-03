/*eslint-disable*/
import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Hidden, List, Slide } from '@material-ui/core';

import StandardRoutes from 'components/Sidebar/StandardRoutes';
import ExtraRoutes from 'components/Sidebar/ExtraRoutes';

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
  //#endregion BASE THINGS

  const { logo, image, logoText, routes, currentlyInspecting } = props;

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
              <StandardRoutes routes={routes} {...props} />
              {currentlyInspecting.kinase.length !== 0 ? brand('Kinases') : undefined}
              <ExtraRoutes extraRoutes={currentlyInspecting.kinase} {...props} />
              {currentlyInspecting.perturbagen.length !== 0 ? brand('Perturbagens') : undefined}
              <ExtraRoutes extraRoutes={currentlyInspecting.perturbagen} {...props} />
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
              <StandardRoutes routes={routes} {...props} />
              <Slide in={currentlyInspecting.kinase.length !== 0} direction='left' mountOnEnter unmountOnExit>
                <div>
                  {currentlyInspecting.kinase.length !== 0 ? brand('Kinases') : undefined}
                  <ExtraRoutes extraRoutes={currentlyInspecting.kinase} {...props} />
                </div>
              </Slide>
              <Slide
                in={currentlyInspecting.perturbagen.length !== 0}
                direction='left'
                mountOnEnter
                unmountOnExit
              >
                <div>
                  {currentlyInspecting.perturbagen.length !== 0 ? brand('Perturbagens') : undefined}
                  <ExtraRoutes extraRoutes={currentlyInspecting.perturbagen} {...props} />
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
