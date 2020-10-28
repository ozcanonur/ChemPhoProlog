import React, { useState, useEffect } from 'react';
import pick from 'lodash/pick';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';

interface Props {
  row: any;
  cell_line: string;
}

const ObsForPDTs = ({ row, cell_line }: Props): JSX.Element => {
  const [data, setData] = useState<Observation[]>([]);

  const PDT = row[0];

  useEffect(() => {
    let mounted = true;

    axios
      .get('/api/observation', {
        params: {
          substrate: PDT,
          cell_line,
          min_fold_change: -888,
          min_p_value: -888,
        },
      })
      .then((res) => {
        if (mounted) {
          const observation = res.data.map((e: Observation) =>
            pick(e, ['perturbagen', 'fold_change'])
          );
          const decimalsCutRes = observation.map((e: Observation) => {
            return { ...e, fold_change: Math.round(e.fold_change * 1e2) / 1e2 };
          });

          setData(decimalsCutRes);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [PDT, cell_line]);

  return (
    <div style={{ height: '400px' }}>
      {data.length === 0 ? (
        'No observation data'
      ) : (
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
      )}
    </div>
  );
};

export default ObsForPDTs;
