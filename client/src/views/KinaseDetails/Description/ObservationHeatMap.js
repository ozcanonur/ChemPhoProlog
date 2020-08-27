/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import HeatMap from 'views/KinaseDetails/Description/HeatMap';

import { CallApi } from 'api/api';

import perturbagenNames from 'views/KinaseDetails/Description/variables/perturbagenNames';

const ObservationHeatMap = ({ row }) => {
  const [observationData, setObservationData] = useState([]);

  const protein = window.location.href.split('/')[4];

  const location = row[0];
  const residue = row[1];

  useEffect(() => {
    let mounted = true;

    const substrate = `${protein}(${residue}${location})`;
    const query =
      `select perturbagen, cell_line, fold_change from observation ` +
      `where substrate="${substrate}" and fold_change > -888`;

    CallApi(query).then((res) => {
      if (mounted) setObservationData(res.map(Object.values));
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [location, residue, protein]);

  const createHeatmapObject = (cell_line, data) => {
    const filtered = data.filter((e) => e[1] === cell_line);

    const result = { cell_line };

    filtered.forEach((observation) => {
      const perturbagen = observation[0];
      const foldChange = observation[2];
      result[perturbagen] = foldChange;
    });

    return result;
  };

  const obsMCF = createHeatmapObject('MCF-7', observationData);
  const obsHL = createHeatmapObject('HL-60', observationData);
  const obsNTERA = createHeatmapObject('NTERA-2 clone D1', observationData);

  const heatmapData = [obsNTERA, obsHL, obsMCF];
  const keys = perturbagenNames;

  return (
    <div>
      {observationData.length === 0 ? (
        <div>No observation data for this site</div>
      ) : (
        <div style={{ height: '20em' }}>
          <HeatMap data={heatmapData} indexBy='cell_line' keys={keys} />
        </div>
      )}
    </div>
  );
};

export default ObservationHeatMap;
