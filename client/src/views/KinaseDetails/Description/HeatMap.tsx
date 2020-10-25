import React from 'react';

import { ResponsiveHeatMap } from '@nivo/heatmap';

import * as d3 from 'd3';

const HeatMap = ({ data, indexBy, keys }): JSX.Element => (
  <ResponsiveHeatMap
    data={data}
    indexBy={indexBy}
    keys={keys}
    axisTop={{
      orient: 'top',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -90,
    }}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
    animate
    hoverTarget='cell'
    cellHoverOthersOpacity={0.25}
    enableLabels={false}
    margin={{ top: 80, right: 10, bottom: 10, left: 120 }}
    minValue={-16}
    maxValue={16}
    colors={d3.scaleSequential(d3.interpolatePiYG)}
    padding={3}
    nanColor='rgb(235, 237, 240)'
  />
);

export default HeatMap;
