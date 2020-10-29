import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  grid: {
    margin: '0 -15px !important',
    width: 'unset',
  },
});

interface Props {
  children: JSX.Element;
}

const GridContainer = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridContainer;
