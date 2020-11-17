import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import buttonsStyles from '../styles';

interface Props {
  color: string;
  text: string;
}

const useStyles = makeStyles(buttonsStyles);

const Border = ({ color, text }: Props) => {
  const classes = useStyles();

  return (
    <Grid container direction='row'>
      <Grid item>
        <span
          className={classes.border}
          style={{
            borderColor: color,
          }}
        />
      </Grid>
      <Grid item className={classes.text}>
        {text}
      </Grid>
    </Grid>
  );
};

export default Border;
