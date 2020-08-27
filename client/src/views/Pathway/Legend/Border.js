import React from 'react';
import Grid from '@material-ui/core/Grid';

const Border = ({ color, text }) => (
  <Grid container direction='row'>
    <Grid item>
      <span
        style={{
          height: '20px',
          width: '20px',
          borderRadius: '50%',
          borderStyle: 'dotted',
          borderColor: color,
          borderWidth: '2',
          display: 'inline-block',
          boxSizing: 'border-box',
        }}
      />
    </Grid>
    <Grid item style={{ fontFamily: 'Roboto', marginLeft: '5px' }}>
      {text}
    </Grid>
  </Grid>
);

export default Border;
