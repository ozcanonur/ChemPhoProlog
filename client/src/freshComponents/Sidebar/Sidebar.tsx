import React from 'react';
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
