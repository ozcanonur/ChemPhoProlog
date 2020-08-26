import React from 'react';

import Grid from '@material-ui/core/Grid';

import { nodes, borders, areas, lines } from 'views/Pathway/Legend/legendVariables';
import { Node, Border, Area, Line } from 'views/Pathway/Legend/legendComponents';

export default () => (
  <Grid container direction='column' spacing={1}>
    <Grid item>
      <Grid container direction='row' style={{ width: '400px' }}>
        {nodes.map(({ color, text }, key) => (
          <Grid item key={key} xs={4}>
            <Node color={color} text={text} />
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction='row' style={{ width: '400px' }}>
        {borders.map(({ color, text }, key) => (
          <Grid item key={key} xs={4}>
            <Border color={color} text={text} />
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction='row' style={{ width: '400px' }}>
        {areas.map(({ color, text }, key) => (
          <Grid item key={key} xs={4}>
            <Area color={color} text={text} />
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction='row' style={{ width: '400px' }}>
        {lines.map(({ color, text }, key) => (
          <Grid item key={key} xs={4}>
            <Line color={color} text={text} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);
