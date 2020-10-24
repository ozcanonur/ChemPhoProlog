import React, { useState, useEffect } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';

import { getApi } from 'api/api';
import ObservationBarChart from 'views/KinaseDetails/Substrates/PDTs/ObservationBarChart';

const PDTTable = ({ cell_line }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [PDTs, setPDTs] = useState([]);
  const kinase = window.location.href.split('/')[4];

  useEffect(() => {
    let mounted = true;
    const route = '/pdts';
    const params = { kinase, cell_line };

    getApi(route, params).then((res) => {
      if (mounted) {
        setPDTs(res);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase, cell_line]);

  return (
    <CardGeneric color='primary' cardTitle='Putative Downstream Targets' cardSubtitle='Select a substrate'>
      {PDTs.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <Table
          className='my-node'
          tableHeaderColor='primary'
          tableHead={['Obs.Data', 'Substrate', 'Protein', 'Confidence', 'Shared with']}
          tableData={PDTs.map(Object.values)}
          rowsPerPage={10}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          cell_line={cell_line}
          ExtraContent={ObservationBarChart}
        />
      )}
    </CardGeneric>
  );
};

export default PDTTable;
