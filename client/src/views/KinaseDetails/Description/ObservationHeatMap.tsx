/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import pick from 'lodash/pick';
import HeatMap from 'views/KinaseDetails/Description/HeatMap';

import { getApi } from 'api/api';
import perturbagens from 'variables/perturbagens';

const ObservationHeatMap = ({ row }): JSX.Element => {
  const [observationData, setObservationData] = useState([]);

  const protein = window.location.href.split('/')[3];

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

  const [obsMCF, obsHL, obsNTERA] = [
    'MCF-7',
    'HL-60',
    'NTERA-2 clone D1',
  ].map((cellLine) => createHeatmapObject(observationData, cellLine));

  const heatmapData = [obsNTERA, obsHL, obsMCF];

  return (
    <div>
      {observationData.length === 0 ? (
        <div>No observation data for this site</div>
      ) : (
        <>
          <div style={{ height: '20em' }}>
            <HeatMap
              data={heatmapData}
              indexBy='cell_line'
              keys={perturbagens}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
            }}
          >
            <div style={{ marginRight: '10px' }}>(-) Fold change</div>
            <div
              style={{
                backgroundColor: 'black',
                height: 20,
                width: 300,
                background:
                  'linear-gradient(90deg, rgba(144,2,84,1) 0%, rgba(255,255,255,1) 50%, rgba(49,112,27,1) 100%)',
              }}
            />
            <div style={{ marginLeft: '10px' }}>(+) Fold change</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ObservationHeatMap;
