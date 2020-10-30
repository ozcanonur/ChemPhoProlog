import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {
  color: string;
  text: string;
}

const Area = ({ color, text }: Props): JSX.Element => (
  <Grid container direction='row'>
    <Grid item>
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: color,
          opacity: 0.4,
        }}
      />
    </Grid>
    <Grid item style={{ fontFamily: 'Roboto', marginLeft: '5px' }}>
      {text}
    </Grid>
  </Grid>
);

export default Area;
