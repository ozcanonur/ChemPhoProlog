import React, { useState, useEffect } from 'react';

import CardGeneric from 'freshComponents/Misc/Card/CardGeneric';
import Table from 'freshComponents/Misc/CustomTable/Table';

import axios from 'axios';
import ObservationBarChart from './ObservationBarChart';

interface Props {
  cellLine: string;
}

const PDTTable = ({ cellLine }: Props): JSX.Element => {
  const [PDTs, setPDTs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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

  const handlePageChange = (_event: Event, newPage: number) => {
    setCurrentPage(newPage);
  };

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
          className='my-node'
          tableHeaderColor='primary'
          tableHead={[
            'Obs.Data',
            'Substrate',
            'Protein',
            'Confidence',
            'Shared with',
          ]}
          tableData={tableData}
          rowsPerPage={10}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          cell_line={cellLine}
          ExtraContent={ObservationBarChart}
        />
      )}
    </CardGeneric>
  );
};

export default PDTTable;
