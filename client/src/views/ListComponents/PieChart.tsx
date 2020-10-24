import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChart = ({ data, colors }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 0, right: 0, bottom: 0, left: 15 }}
    innerRadius={0.35}
    padAngle={2}
    colors={colors}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor='#333333'
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={10}
    radialLabelsLinkHorizontalLength={10}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor='#fff'
    animate
    motionStiffness={90}
    motionDamping={15}
  />
);

export default PieChart;
