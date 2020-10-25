import React from 'react';

import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ data }): JSX.Element => (
  <ResponsiveBar
    data={data}
    keys={['fold_change']}
    indexBy='perturbagen'
    margin={{ top: 20, right: 0, bottom: 100, left: 65 }}
    padding={0.3}
    colors={{ scheme: 'nivo' }}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 90,
      legend: 'Perturbagen',
      legendPosition: 'middle',
      legendOffset: 90,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Fold change',
      legendPosition: 'middle',
      legendOffset: -50,
    }}
    enableLabel={false}
    animate
    motionStiffness={90}
    motionDamping={15}
    minValue={-20}
    maxValue={20}
  />
);

export default BarChart;
