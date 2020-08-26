import React from 'react';

import Grid from '@material-ui/core/Grid';

export const Node = ({ color, text }) => (
  <Grid container direction='row'>
    <Grid item>
      <span
        style={{
          height: '20px',
          width: '20px',
          backgroundColor: color,
          borderRadius: '50%',
          display: 'inline-block',
        }}
      />
    </Grid>
    <Grid item style={{ fontFamily: 'Roboto', marginLeft: '5px' }}>
      {text}
    </Grid>
  </Grid>
);

export const Border = ({ color, text }) => (
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

export const Line = ({ color, text }) => (
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

export const Area = ({ color, text }) => (
  <Grid container direction='row'>
    <Grid item>
      <div style={{ width: '20px', height: '20px', backgroundColor: color, opacity: 0.4 }} />
    </Grid>
    <Grid item style={{ fontFamily: 'Roboto', marginLeft: '5px' }}>
      {text}
    </Grid>
  </Grid>
);
