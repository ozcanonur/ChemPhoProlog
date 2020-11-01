import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import buttonsStyles from '../style';

interface Props {
  color: string;
  text: string;
}

const useStyles = makeStyles(buttonsStyles);

const Area = ({ color, text }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container direction='row'>
      <Grid item>
        <div
          className={classes.area}
          style={{
            backgroundColor: color,
          }}
        />
      </Grid>
      <Grid item className={classes.text}>
        {text}
      </Grid>
    </Grid>
  );
};

export default Area;
