import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GlobalSearch from 'components/Navbar/GlobalSearch';
import Button from 'components/Misc/CustomButton/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import navbarStyles from './styles/navbar';
import { getCurrentNav } from './helpers';

const useStyles = makeStyles(navbarStyles);

interface Props {
  routes: Route[];
}

const Navbar = ({ routes }: Props) => {
  const classes = useStyles();

  const currentNav = getCurrentNav(routes);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <GridContainer
          direction='row'
          justify='space-between'
          style={{ width: '100%' }}
        >
          <GridItem>
            <div className={classes.flex}>
              <Button color='transparent' className={classes.title}>
                <p>{currentNav || ''}</p>
              </Button>
            </div>
          </GridItem>
          <GridItem>
            <GlobalSearch />
          </GridItem>
        </GridContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
