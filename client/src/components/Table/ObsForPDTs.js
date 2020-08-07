import React, { useState, useEffect } from 'react';

import { CallApi } from 'api/api';

import { ResponsiveBar } from '@nivo/bar';

const MyResponsiveBar = ({ data }) => (
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
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
);

const ObsForPDTs = ({ PDT, cell_line }) => {
  const [observationData, setObservationData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const query =
      `select perturbagen, fold_change from observation where ` +
      `substrate='${PDT}' and cell_line='${cell_line}' and p_value > -888 ` +
      `and fold_change > -888 order by perturbagen`;

    CallApi(query).then((res) => {
      if (mounted) {
        const decimalsCutRes = res.map((e) => {
          return { ...e, fold_change: Math.round(e.fold_change * 1e2) / 1e2 };
        });

        setObservationData(decimalsCutRes);
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [PDT, cell_line]);

  return (
    <div style={{ height: '400px' }}>
      {observationData !== [] ? <MyResponsiveBar data={observationData} /> : 'No observation data'}
    </div>
  );
};

export default ObsForPDTs;
