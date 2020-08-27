import React from 'react';
import Grid from '@material-ui/core/Grid';

const Line = ({ color, text }) => (
  <Grid container direction='row'>
    <Grid item>
      <hr
        style={{
          borderTop: `3px dashed ${color}`,
          color: 'white',
          backgroundColor: 'white',
          width: '18',
        }}
      />
    </Grid>
    <Grid item style={{ fontFamily: 'Roboto', marginLeft: '5px' }}>
      {text}
    </Grid>
  </Grid>
);

export default Line;
