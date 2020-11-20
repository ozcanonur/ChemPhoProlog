/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import * as d3 from 'd3';

import Loading from 'components/Misc/Loading/Loading';
import { fetchFromApi } from 'utils/api';
import perturbagens from 'variables/perturbagens';
import { createHeatmapObject } from './helpers';

const useStyles = makeStyles({
  container: {
    height: '20em',
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
  },
  legendGradient: {
    height: 20,
    width: 300,
    background: 'linear-gradient(90deg, rgba(144,2,84,1) 0%, rgba(255,255,255,1) 50%, rgba(49,112,27,1) 100%)',
  },
  legendLeftText: { marginRight: '10px' },
  legendRightText: { marginLeft: '10px' },
});

interface Props {
  row: string[];
}

interface ObsData {
  perturbagen: string;
  substrate: string;
  cell_line: string;
  fold_change: number;
}

const ObservationHeatMap = (isKnownSubstrates: boolean) => {
  return ({ row }: Props) => {
    const classes = useStyles();

    const [obsData, setObsData] = useState<ObsData[]>([]);
    const [loading, setLoading] = useState(false);

    const kinase = window.location.href.split('/')[3];

    // Fetch the data
    useEffect(() => {
      let mounted = true;
      setLoading(true);

      // row[1] = residue, row[0] = location
      const substrate = isKnownSubstrates ? row[0] : `${kinase}(${row[1]}${row[0]})`;

      fetchFromApi('/apiWeb/observationForHeatmap', {
        substrate,
      }).then((res) => {
        if (mounted && res) {
          setObsData(res);
          setLoading(false);
        }
      });

      return () => {
        mounted = false;
      };
    }, [kinase, row]);

    const heatmapData = ['MCF-7', 'HL-60', 'NTERA-2 clone D1'].map((cellLine) => createHeatmapObject(obsData, cellLine));

    return (
      <div>
        {obsData.length === 0 && !loading ? (
          <div>No observation data for this site</div>
        ) : loading ? (
          <Loading />
        ) : (
          <div>
            <div className={classes.container}>
              <ResponsiveHeatMap
                data={heatmapData}
                indexBy='cellLine'
                keys={perturbagens}
                axisTop={{
                  orient: 'top',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -90,
                }}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
                animate
                hoverTarget='cell'
                cellHoverOthersOpacity={0.25}
                enableLabels={false}
                margin={{ top: 80, right: 10, bottom: 10, left: 120 }}
                minValue={-16}
                maxValue={16}
                // @ts-ignore
                colors={d3.scaleSequential(d3.interpolatePiYG)}
                padding={3}
                // @ts-ignore
                nanColor='rgb(206, 203, 203)'
              />
            </div>
            <div className={classes.legendContainer}>
              <div className={classes.legendLeftText}>(-) Fold change</div>
              <div className={classes.legendGradient} />
              <div className={classes.legendRightText}>(+) Fold change</div>
            </div>
          </div>
        )}
      </div>
    );
  };
};

export default ObservationHeatMap;
