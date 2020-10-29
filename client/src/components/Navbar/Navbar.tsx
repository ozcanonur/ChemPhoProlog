import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GlobalSearch from 'components/Navbar/GlobalSearch';
import Button from 'components/Misc/CustomButton/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import navbarStyles from './styles/navbar';

const useStyles = makeStyles(navbarStyles);

interface Props {
  routes: Route[];
}

const getCurrentNav = (routes: Route[]) => {
  let name;
  let term = '';

  routes.map((route) => {
    if (window.location.href.indexOf(route.path) !== -1) name = route.name;
    if (window.location.href.split('/').length > 4)
      [, , , term] = window.location.href.split('/');
    return null;
  });

  return term !== '' ? `${name} for ${term}` : name;
};

const Navbar = ({ routes }: Props): JSX.Element => {
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
                {currentNav || ''}
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
