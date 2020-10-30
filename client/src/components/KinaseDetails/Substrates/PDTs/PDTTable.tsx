import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import ObservationBarChart from './ObservationBarChart';

interface Props {
  cellLine: string;
}

const PDTTable = ({ cellLine }: Props): JSX.Element => {
  const [PDTs, setPDTs] = useState([]);

  const kinase = window.location.href.split('/')[3];

  useEffect(() => {
    let mounted = true;
    axios
      .get('/api/pdts', { params: { kinase, cell_line: cellLine } })
      .then((res) => {
        if (mounted) setPDTs(res.data);
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [kinase, cellLine]);

  const tableData = PDTs.map(Object.values);

  return (
    <CardGeneric
      color='primary'
      cardTitle='Putative Downstream Targets'
      cardSubtitle='Select a substrate'
    >
      {tableData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <Table
          id={`${cellLine}_${kinase}_PDTTable`}
          tableHead={[
            'Obs.Data',
            'Substrate',
            'Protein',
            'Confidence',
            'Shared with',
          ]}
          tableData={tableData}
          RowExpandableContentLeft={ObservationBarChart(cellLine)}
          searchIndex={0}
        />
      )}
    </CardGeneric>
  );
};

export default PDTTable;
