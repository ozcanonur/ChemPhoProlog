/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import HeatMap from 'views/KinaseDetails/Description/HeatMap';

import getApi from 'api/api';

import perturbagens from 'views/KinaseDetails/Description/variables/perturbagens';

const ObservationHeatMap = ({ row }) => {
  const [observationData, setObservationData] = useState([]);

  const protein = window.location.href.split('/')[4];

  const location = row[0];
  const residue = row[1];

  useEffect(() => {
    let mounted = true;

    const substrate = `${protein}(${residue}${location})`;
    const route = '/getObservation';
    const params = { substrate, for: 'heatMap' };

    getApi(route, params).then((res) => {
      if (mounted) setObservationData(res.map(Object.values));
    });

    return () => {
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

  const [obsMCF, obsHL, obsNTERA] = ['MCF-7', 'HL-60', 'NTERA-2 clone D1'].map((cellLine) =>
    createHeatmapObject(cellLine, observationData)
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
