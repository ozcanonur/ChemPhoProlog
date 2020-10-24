/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import pick from 'lodash/pick';

import HeatMap from 'views/KinaseDetails/Description/HeatMap';

import { getApi } from 'api/api';

import perturbagens from 'variables/perturbagens';

const ObservationHeatMap = ({ row }) => {
  const [observationData, setObservationData] = useState([]);

  const protein = window.location.href.split('/')[4];

  const location = row[0];
  const residue = row[1];

  useEffect(() => {
    let mounted = true;

    const substrate = `${protein}(${residue}${location})`;
    const route = '/observation';
    const params = { substrate, min_fold_change: -888 };

    getApi(route, params).then((res) => {
      const observation = res.map((row) =>
        pick(row, ['perturbagen', 'substrate', 'cell_line', 'fold_change'])
      );
      if (mounted) setObservationData(observation);
    });

    return () => {
      mounted = false;
    };
  }, [location, residue, protein]);

  const createHeatmapObject = (data, cell_line) => {
    const filtered = data.filter((e) => e.cell_line === cell_line);

    const result = { cell_line };
    filtered.forEach((observation) => {
      const { perturbagen, fold_change } = observation;
      result[perturbagen] = fold_change;
    });

    return result;
  };

  const [obsMCF, obsHL, obsNTERA] = ['MCF-7', 'HL-60', 'NTERA-2 clone D1'].map((cellLine) =>
    createHeatmapObject(observationData, cellLine)
  );

  const heatmapData = [obsNTERA, obsHL, obsMCF];

  return (
    <div>
      {observationData.length === 0 ? (
        <div>No observation data for this site</div>
      ) : (
        <div style={{ height: '20em' }}>
          <HeatMap data={heatmapData} indexBy='cell_line' keys={perturbagens} />
        </div>
      )}
    </div>
  );
};

export default ObservationHeatMap;
