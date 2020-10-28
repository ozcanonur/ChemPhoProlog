import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import partition from 'lodash/partition';

import image from 'assets/img/dna.jpg';
import bezzLabLogo from 'assets/img/bezzlab.png';
import reactLogo from 'assets/img/reactlogo.png';

import SidebarTitle from 'freshComponents/Sidebar/SidebarTitle';
import generateSubRoutes from 'variables/generateSubRoutes';
import standardRoutes from 'variables/standardRoutes';
import StandardRoute from 'freshComponents/Sidebar/StandardRoutes';
import ExtraRoutes from 'freshComponents/Sidebar/ExtraRoutes';
import sidebarStyles from './sidebarStyles';

const useStyles = makeStyles(sidebarStyles);

const Sidebar = (): JSX.Element => {
  const classes = useStyles();

  const extraSidebarRoutes = useSelector(
    (state: RootState) => state.extraSidebarRoutes
  );

  const scrollDownref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollDownref.current)
      scrollDownref.current.scrollIntoView({ behavior: 'smooth' });
  }, [extraSidebarRoutes]);

  const [allExtraKinaseRoutes, allExtraPerturbagenRoutes] = partition(
    extraSidebarRoutes,
    (e) => e.type === 'kinase'
  );

  const generatedKinaseSubRoutes = allExtraKinaseRoutes.map((route) =>
    generateSubRoutes(route.type, route.name)
  );

  const generatedPerturbagenSubRoutes = allExtraPerturbagenRoutes.map((route) =>
    generateSubRoutes(route.type, route.name)
  );

  return (
    <Drawer
      anchor='left'
      variant='permanent'
      open
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <SidebarTitle title='Chemphoprolog' logo={bezzLabLogo} />
      <div className={classes.sidebarWrapper}>
        <List className={classes.list}>
          {standardRoutes.map((route) => (
            <StandardRoute key={route.name} route={route} />
          ))}
          <Slide
            in={allExtraKinaseRoutes.length !== 0}
            direction='left'
            mountOnEnter
            unmountOnExit
          >
            <div className={classes.extraSidebarContainer}>
              <SidebarTitle title='Kinases' logo={reactLogo} />
              {generatedKinaseSubRoutes.map((routes) => (
                <ExtraRoutes key={routes[0].path} routes={routes} />
              ))}
            </div>
          </Slide>
          <Slide
            in={allExtraPerturbagenRoutes.length !== 0}
            direction='left'
            mountOnEnter
            unmountOnExit
          >
            <div className={classes.extraSidebarContainer}>
              <SidebarTitle title='Perturbagens' logo={reactLogo} />
              {generatedPerturbagenSubRoutes.map((routes) => (
                <ExtraRoutes key={routes[0].path} routes={routes} />
              ))}
            </div>
          </Slide>
          <div ref={scrollDownref} />
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
