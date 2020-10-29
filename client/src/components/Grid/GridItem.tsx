import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  grid: {
    padding: '0 15px !important',
  },
});

interface Props {
  children: JSX.Element;
}

const GridItem = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridItem;
