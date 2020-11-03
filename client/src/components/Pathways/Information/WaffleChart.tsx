import React from 'react';
import { useSelector } from 'react-redux';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import { ResponsiveWaffle } from '@nivo/waffle';

const Waffle = () => {
  const { cellLine, perturbagen, substrate } = useSelector((state: RootState) => state.pathwayInputs);

  const data = useSelector((state: RootState) => state.pathwayData);

  const { paths, stoppingReasons } = data;

  const stoppingReasonCounts: { [key: string]: number } = {
    no_data: 0,
    unaffected: 0,
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
    <CardGeneric
      color='primary'
      cardTitle='Stopping Reasons'
      cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate}`}
      style={{ height: '16rem', marginTop: '3rem' }}
    >
      <div style={{ height: '9rem' }}>
        <ResponsiveWaffle
          data={waffleData}
          total={totalCount}
          rows={6}
          columns={50}
          fillDirection='left'
          margin={{ top: 50, right: 0, bottom: 0, left: 0 }}
          colors={['#2D4159', '#00acc1', '#B55560', '#e5ad06', '#4F0EAB', '#001233']}
          borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
          animate={false}
          // @ts-ignore
          legends={[
            {
              anchor: 'top',
              direction: 'row',
              justify: false,
              translateX: 10,
              translateY: -50,
              itemsSpacing: 1,
              itemWidth: 100,
              itemHeight: 10,
              itemDirection: 'left-to-right',
              itemOpacity: 0.8,
              itemTextColor: '#777',
              symbolSize: 10,
            },
          ]}
        />
      </div>
    </CardGeneric>
  );
};

export default Waffle;
