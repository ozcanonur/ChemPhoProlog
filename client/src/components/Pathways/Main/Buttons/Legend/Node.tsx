import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {
  color: string;
  text: string;
}

const Node = ({ color, text }: Props): JSX.Element => (
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

export default Node;
