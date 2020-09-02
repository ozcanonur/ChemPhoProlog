import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Drawer, Hidden, List } from '@material-ui/core';

import image from 'assets/img/dna.jpg';
import logo from 'assets/img/bezzlab.png';

import StandardRoutes from 'components/Sidebar/StandardRoutes';
import ExtraRoutes from 'components/Sidebar/ExtraRoutes';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle';
import makeStyles from '@material-ui/core/styles/makeStyles';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

let ps;

const useStyles = makeStyles(styles);

const Sidebar = ({ open, handleDrawerToggle }) => {
  const [, setMobileOpen] = useState(false);

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

    return () => {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [panel]);

  const classes = useStyles();

  const brand = (text) => (
    <div className={classes.logo}>
      <a href='# ' className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        {text}
      </a>
    </div>
  );

  return (
    <div>
      <Hidden smDown implementation='css'>
        <Drawer
          anchor='left'
          variant='permanent'
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand('ChemPhoProlog')}
          <div className={classes.sidebarWrapper} ref={panel}>
            <List className={classes.list}>
              <StandardRoutes />
              <ExtraRoutes type='kinase' />
              <ExtraRoutes type='perturbagen' />
            </List>
          </div>
          <div className={classes.background} style={{ backgroundImage: `url(${image})` }} />
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor='right'
          open={open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {brand('ChemPhoProlog')}
          <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
              <StandardRoutes />
              <ExtraRoutes type='kinase' />
              <ExtraRoutes type='perturbagen' />
            </List>
          </div>
          <div className={classes.background} style={{ backgroundImage: `url(${image})` }} />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default Sidebar;
