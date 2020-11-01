/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import pick from 'lodash/pick';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import * as d3 from 'd3';

import perturbagens from 'variables/perturbagens';
import observationHeatMapStyles from './styles/observationHeatMap';

const useStyles = makeStyles(observationHeatMapStyles);

interface Props {
  row: string[];
}

interface ObsData {
  perturbagen: string;
  substrate: string;
  cell_line: string;
  fold_change: number;
}

const fetchObservation = async (substrate: string) => {
  try {
    const response = await axios.get('/api/observation', {
      params: { substrate, min_fold_change: -888 },
    });
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

const formatObservation = (data: Observation[]) => {
  const relevantFieldsPicked = data.map((e: Observation) =>
    pick(e, ['perturbagen', 'substrate', 'cell_line', 'fold_change'])
  );
  const decimalsCut = relevantFieldsPicked.map((e) => {
    return {
      ...e,
      fold_change: Math.round(e.fold_change * 1e2) / 1e2,
    };
  });
  return decimalsCut;
};

const ObservationHeatMap = (isKnownSubstrates: boolean) => {
  return ({ row }: Props): JSX.Element => {
    const classes = useStyles();

    const [obsData, setObsData] = useState<ObsData[]>([]);

    const kinase = window.location.href.split('/')[3];

    // Fetch the data
    useEffect(() => {
      let mounted = true;

      // row[1] = residue, row[0] = location
      const substrate = isKnownSubstrates
        ? row[0]
        : `${kinase}(${row[1]}${row[0]})`;

      fetchObservation(substrate).then((res) => {
        if (mounted && res) setObsData(formatObservation(res));
      });

      return () => {
        mounted = false;
      };
    }, [kinase, row]);

    /* Required format for heatmap
  cellLine: 'MCF-7',
  AZD1480: -15.2342,
  Torin: 15.2324,
  ..
  */
    const createHeatmapObject = (cellLine: string) => {
      const filtered = obsData.filter((e) => e.cell_line === cellLine);

      const result: { [key: string]: string | number } = { cellLine };
      filtered.forEach((observation) => {
        const { perturbagen, fold_change } = observation;
        result[perturbagen] = fold_change;
      });

      return result;
    };

    const heatmapData = [
      createHeatmapObject('MCF-7'),
      createHeatmapObject('HL-60'),
      createHeatmapObject('NTERA-2 clone D1'),
    ];

    return (
      <div>
        {obsData.length === 0 ? (
          <div>No observation data for this site</div>
        ) : (
          <>
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
                nanColor='rgb(235, 237, 240)'
              />
            </div>
            <div className={classes.legendContainer}>
              <div className={classes.legendLeftText}>(-) Fold change</div>
              <div className={classes.legendGradient} />
              <div className={classes.legendRightText}>(+) Fold change</div>
            </div>
          </>
        )}
      </div>
    );
  };
};

export default ObservationHeatMap;
