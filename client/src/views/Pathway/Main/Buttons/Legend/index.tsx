import React from 'react';

import Grid from '@material-ui/core/Grid';

import { nodes, borders, areas, lines } from 'views/Pathway/Main/Buttons/Legend/variables';
import Node from 'views/Pathway/Main/Buttons/Legend/Node';
import Border from 'views/Pathway/Main/Buttons/Legend/Border';
import Area from 'views/Pathway/Main/Buttons/Legend/Area';
import Line from 'views/Pathway/Main/Buttons/Legend/Line';

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
            {variable.map(({ color, text }, key) => (
              <Grid item key={key} xs={4}>
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
