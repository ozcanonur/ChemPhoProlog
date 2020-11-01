/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import pick from 'lodash/pick';
import axios from 'axios';
import { BarDatum, ResponsiveBar } from '@nivo/bar';

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

const formatObservation = (data: Observation[]) => {
  const relevantFieldsPicked = data.map((e) =>
    pick(e, ['perturbagen', 'fold_change'])
  );
  const decimalsCutRes = relevantFieldsPicked.map((e) => {
    return {
      ...e,
      fold_change: Math.round(e.fold_change * 1e2) / 1e2,
    };
  });
  return decimalsCutRes;
};

const fetchKnownPerturbagens = async (kinase: string) => {
  try {
    const response = await axios.get('/api/knownPerturbagens', {
      params: { kinase },
    });
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

const fetchObservation = async (substrate: string, cellLine: string) => {
  try {
    const response = await axios.get('/api/observation', {
      params: { substrate, cellLine, min_fold_change: -888, min_p_value: -888 },
    });
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

const getLabel = (perturbagen: string, pkData: PkData[]) => {
  const hasIndicator = pkData.some((row) => row.perturbagen === perturbagen);
  return hasIndicator ? '*' : '';
};

const ObservationBarChart = (cellLine: string) => {
  return ({ row }: Props): JSX.Element => {
    const [obsData, setObsData] = useState<ObsData[]>([]);
    const [pkData, setPkData] = useState<PkData[]>([]);

    const kinase = window.location.href.split('/')[3];
    const substrate = row[0];

    useEffect(() => {
      let mounted = true;

      Promise.all([
        fetchObservation(substrate, cellLine),
        fetchKnownPerturbagens(kinase),
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
            label={(d: BarDatum) => getLabel(d.indexValue.toString(), pkData)}
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
