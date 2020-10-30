import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {
  color: string;
  text: string;
}

const Line = ({ color, text }: Props): JSX.Element => (
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
