import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GridItem from 'freshComponents/Misc/CustomGrid/GridItem';
import GridContainer from 'freshComponents/Misc/CustomGrid/GridContainer';
import AdminNavbarLinks from 'freshComponents/Navbar/AdminNavbarLinks';
import Button from 'freshComponents/Misc/CustomButton/Button';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: 1020,
    color: '#555555',
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    minHeight: '50px',
  },
  flex: {
    flex: 1,
  },
  title: {
    letterSpacing: 'unset',
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    margin: '0',
    '&:hover,&:focus': {
      background: 'transparent',
    },
  },
  appResponsive: {
    top: '8px',
  },
  primary: {
    backgroundColor: '#001233',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
  info: {
    backgroundColor: '#00acc1',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
  success: {
    backgroundColor: '#2D4159',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
  warning: {
    backgroundColor: '#FFC107',
    color: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
  },
});

const Navbar = ({ routes }) => {
  const classes = useStyles();

  const makeBrand = () => {
    let name;
    let term = '';

    routes.map((prop) => {
      if (window.location.href.indexOf(prop.path) !== -1) name = prop.name;
      if (window.location.href.split('/').length > 4)
        [, , , term] = window.location.href.split('/');
      return null;
    });

    return term !== '' ? `${name} for ${term}` : name;
  };

  const appBarClasses = classNames({
    [` ${classes.blue}`]: 'blue',
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <GridContainer
          direction='row'
          justify='space-between'
          style={{ width: '100%' }}
        >
          <GridItem>
            <div className={classes.flex}>
              <Button color='transparent' href='#' className={classes.title}>
                {makeBrand() ? makeBrand() : ''}
              </Button>
            </div>
          </GridItem>
          <GridItem>
            <AdminNavbarLinks />
          </GridItem>
        </GridContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
