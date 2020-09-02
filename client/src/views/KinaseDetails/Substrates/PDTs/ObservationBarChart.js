import React, { useState, useEffect } from 'react';

import { CallApi } from 'api/api';

import BarChart from 'views/KinaseDetails/Substrates/PDTs/BarChart';

const ObsForPDTs = ({ row, cell_line }) => {
  const [observationData, setObservationData] = useState([]);

  const PDT = row[0];

  useEffect(() => {
    let mounted = true;

    const query =
      `select perturbagen, fold_change from observation where ` +
      `substrate='${PDT}' and cell_line='${cell_line}' and p_value > -888 ` +
      `and fold_change > -888 order by perturbagen`;

    CallApi(query).then((res) => {
      if (mounted) {
        const decimalsCutRes = res.map((e) => {
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
      {observationData !== [] ? <BarChart data={observationData} /> : 'No observation data'}
    </div>
  );
};

export default ObsForPDTs;
