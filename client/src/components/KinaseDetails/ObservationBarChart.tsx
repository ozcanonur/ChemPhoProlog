/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { BarDatum, ResponsiveBar } from '@nivo/bar';
import Loading from 'components/Misc/Loading/Loading';
import makeStyles from '@material-ui/core/styles/makeStyles';

// import * as d3 from 'd3';

import { fetchFromApi } from 'utils/api';
import { getBarChartLabel } from './Substrates/helpers';

const useStyles = makeStyles({
  container: {
    height: '400px',
  },
  tooltip: {
    '& p': {
      marginBottom: 0,
    },
    '&:first-child': {
      marginTop: 0,
    },
  },
});

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
  const classes = useStyles();

  return ({ row }: Props) => {
    const [obsData, setObsData] = useState<ObsData[]>([]);
    const [pkData, setPkData] = useState<PkData[]>([]);
    const [loading, setLoading] = useState(false);

    const kinase = window.location.href.split('/')[3];
    const substrate = row[0];

    useEffect(() => {
      let mounted = true;
      setLoading(true);

      Promise.all([
        fetchFromApi('/apiWeb/observationForBarchart', {
          cellLine,
          substrate,
        }),
        fetchFromApi('/api/knownPerturbagens', { kinase }),
      ]).then(([resObs, resPk]) => {
        if (mounted && resObs && resPk) {
          setObsData(resObs);
          setPkData(resPk);
          setLoading(false);
        }
      });

      return () => {
        mounted = false;
      };
    }, [substrate, kinase]);

    return (
      <div className={classes.container}>
        {obsData.length === 0 && !loading ? (
          'No observation data'
        ) : loading ? (
          <Loading />
        ) : (
          <ResponsiveBar
            data={obsData}
            keys={['fold_change']}
            indexBy='perturbagen'
            margin={{ top: 20, right: 0, bottom: 100, left: 65 }}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
            // colorBy={(d) => {
            //   console.log(d);
            //   return d.data.p_value;
            // }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: 'Perturbagen, (*): Known Inhibitor',
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
            label={(d: BarDatum) => getBarChartLabel(d.indexValue.toString(), pkData)}
            tooltip={({ data }) => (
              <div className={classes.tooltip}>
                <p>
                  <strong>{data.perturbagen}</strong>
                </p>
                <p>{`fold_change: ${data.fold_change}`}</p>
                <p>{`p_value: ${data.p_value}`}</p>
              </div>
            )}
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
