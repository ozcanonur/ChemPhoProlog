/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import pick from 'lodash/pick';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';

import perturbagens from 'variables/perturbagens';
import HeatMap from './HeatMap';
import observationHeatMapStyles from './styles/observationHeatMap';

const useStyles = makeStyles(observationHeatMapStyles);

interface Props {
  row: any;
}

const ObservationHeatMap = ({ row }: Props): JSX.Element => {
  const classes = useStyles();

  const [data, setData] = useState<Observation[]>([]);

  // Current route
  const protein = window.location.href.split('/')[3];

  // Current row's location and residue
  const location = row[0];
  const residue = row[1];

  // Fetch the data
  useEffect(() => {
    let mounted = true;

    const substrate = `${protein}(${residue}${location})`;

    axios
      .get('/api/observation', { params: { substrate, min_fold_change: -888 } })
      .then((res) => {
        if (mounted) {
          const relevantFieldsPicked = res.data.map((e: Observation) =>
            pick(e, ['perturbagen', 'substrate', 'cell_line', 'fold_change'])
          );
          setData(relevantFieldsPicked);
        }
      });

    return () => {
      mounted = false;
    };
  }, [location, residue, protein]);

  /* Required format for heatmap
  cellLine: 'MCF-7',
  AZD1480: -15.2342,
  Torin: 15.2324,
  ..
  */
  const createHeatmapObject = (cellLine: string) => {
    const filtered = data.filter((e) => e.cell_line === cellLine);

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
      {data.length === 0 ? (
        <div>No observation data for this site</div>
      ) : (
        <>
          <div className={classes.container}>
            <HeatMap
              data={heatmapData}
              indexBy='cellLine'
              keys={perturbagens}
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

export default ObservationHeatMap;
