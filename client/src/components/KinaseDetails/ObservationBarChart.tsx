/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { BarDatum, ResponsiveBar } from '@nivo/bar';

import { fetchFromApi } from 'utils/api';
import { formatObservation, getBarChartLabel } from './Substrates/helpers';

interface Props {
  row: string[];
}

interface ObsData {
  fold_change: number;
  perturbagen: string;
}

interface PkData {
  kinase: string;
  perturbagen: string;
  source: string;
  score: string;
}

const ObservationBarChart = (cellLine: string) => {
  return ({ row }: Props) => {
    const [obsData, setObsData] = useState<ObsData[]>([]);
    const [pkData, setPkData] = useState<PkData[]>([]);

    const kinase = window.location.href.split('/')[3];
    const substrate = row[0];

    useEffect(() => {
      let mounted = true;

      Promise.all([
        fetchFromApi('/api/observation', {
          substrate,
          cellLine,
          min_fold_change: -888,
          min_p_value: -888,
        }),
        fetchFromApi('/api/knownPerturbagens', { kinase }),
      ]).then(([resObs, resPk]) => {
        if (mounted && resObs && resPk) {
          setObsData(formatObservation(resObs));
          setPkData(resPk);
        }
      });

      return () => {
        mounted = false;
      };
    }, [substrate, kinase]);

    return (
      <div style={{ height: '400px' }}>
        {obsData.length === 0 ? (
          'No observation data'
        ) : (
          <ResponsiveBar
            data={obsData}
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
            label={(d: BarDatum) =>
              getBarChartLabel(d.indexValue.toString(), pkData)
            }
            labelTextColor='black'
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
};

export default ObservationBarChart;
