import React from 'react';
import { ResponsivePie } from '@nivo/pie';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsivePie = ({ data /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    startAngle={-3}
    innerRadius={0.2}
    padAngle={4}
    colors={['hsl(33, 100%, 49%)', 'hsl(287, 65%, 40%)']}
    borderWidth={3}
    borderColor={{ from: 'color', modifiers: [['darker', '1']] }}
    radialLabelsSkipAngle={12}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor='#333333'
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={4}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor='#FFFFFF'
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    pixelRatio={100}
  />
);

export default MyResponsivePie;
