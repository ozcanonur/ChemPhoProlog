import React, { useState, useEffect } from 'react';

import pick from 'lodash/pick';

import { getApi } from 'api/api';

import BarChart from 'views/KinaseDetails/Substrates/PDTs/BarChart';

const ObsForPDTs = ({ row, cell_line }): JSX.Element => {
  const [observationData, setObservationData] = useState([]);

  const PDT = row[0];

  useEffect(() => {
    let mounted = true;

    const route = '/observation';
    const params = {
      substrate: PDT,
      cell_line,
      min_fold_change: -888,
      min_p_value: -888,
    };

    getApi(route, params).then((res) => {
      if (mounted) {
        const observation = res.map((row) =>
          pick(row, ['perturbagen', 'fold_change'])
        );
        const decimalsCutRes = observation.map((e) => {
          return { ...e, fold_change: Math.round(e.fold_change * 1e2) / 1e2 };
        });

        setObservationData(decimalsCutRes);
      }
    });

    return () => {
      mounted = false;
    };
  }, [PDT, cell_line]);

  return (
    <div style={{ height: '400px' }}>
      {observationData !== [] ? (
        <BarChart data={observationData} />
      ) : (
        'No observation data'
      )}
    </div>
  );
};

export default ObsForPDTs;
