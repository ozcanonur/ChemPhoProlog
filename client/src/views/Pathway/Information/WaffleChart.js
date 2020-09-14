import React from 'react';

import { ResponsiveWaffle } from '@nivo/waffle';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const Waffle = ({ paths, stoppingReasons }) => {
  const stoppingReasonCounts = {
    unaffected: 0,
    no_data: 0,
    no_prior_knowledge: 0,
    loop: 0,
    unexpectedFC: 0,
    known_inhibitor: 0,
  };

  paths.forEach((path) => {
    const endNode = path[path.length - 1];
    const stopReason = stoppingReasons[endNode];
    stoppingReasonCounts[stopReason] += 1;
  });

  let totalCount = 0;
  const waffleData = Object.keys(stoppingReasonCounts).map((key) => {
    totalCount += stoppingReasonCounts[key];
    return { id: key, label: key, value: stoppingReasonCounts[key] };
  });

  return (
    <ResponsiveWaffle
      data={waffleData}
      total={totalCount}
      rows={6}
      columns={50}
      fillDirection='left'
      margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
      colors={['#001233', '#00acc1', '#B55560', '#e5ad06', '#4F0EAB', '#2D4159']}
      borderColor={{ from: 'color', modifiers: [['darker', '0.6']] }}
      animate={false}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -5,
          itemsSpacing: 10,
          itemWidth: 120,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.8,
          itemTextColor: '#777',
          symbolSize: 20,
        },
      ]}
    />
  );
};

export default Waffle;
