/* eslint-disable react/no-array-index-key */
import React from 'react';

import Grid from '@material-ui/core/Grid';

import { nodes, borders, areas, lines } from './variables';
import Node from './Node';
import Border from './Border';
import Area from './Area';
import Line from './Line';

const Legend = () => {
  const legends = [
    {
      variable: nodes,
      Component: Node,
    },
    {
      variable: borders,
      Component: Border,
    },
    {
      variable: areas,
      Component: Area,
    },
    {
      variable: lines,
      Component: Line,
    },
  ];

  return (
    <Grid container direction='column' spacing={1}>
      {legends.map(({ variable, Component }, key) => (
        <Grid item key={key}>
          <Grid container direction='row' style={{ width: '400px' }}>
            {variable.map(({ color, text }, key2) => (
              <Grid item key={key2} xs={4}>
                <Component color={color} text={text} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Legend;
