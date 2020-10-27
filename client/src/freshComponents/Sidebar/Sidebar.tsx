import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import image from 'assets/img/dna.jpg';
import logo from 'assets/img/bezzlab.png';

import StandardRoutes from 'freshComponents/Sidebar/StandardRoutes';
import ExtraRoutes from 'freshComponents/Sidebar/ExtraRoutes';
import sidebarStyles from './sidebarStyles';

const useStyles = makeStyles(sidebarStyles);

const Sidebar = (): JSX.Element => {
  const classes = useStyles();

  const ref = useRef(null);

  const additionalRoutes = useSelector(
    (state: RootState) => state.extraSidebarRoutes
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [additionalRoutes]);

  return (
    <Drawer
      anchor='left'
      variant='permanent'
      open
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.logo}>
        <a href='# ' className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt='logo' className={classes.img} />
          </div>
          Chemphoprolog
        </a>
      </div>
      <div className={classes.sidebarWrapper}>
        <List className={classes.list}>
          <StandardRoutes />
          <ExtraRoutes type='kinase' />
          <ExtraRoutes type='perturbagen' />
          <div ref={ref} />
        </List>
      </div>
      <div
        className={classes.background}
        style={{ backgroundImage: `url(${image})` }}
      />
    </Drawer>
  );
};

export default Sidebar;
