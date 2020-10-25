import React, { useEffect, useState } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';

import { getApi } from 'api/api';

const KnownSubstratesTable = (): JSX.Element => {
  const kinase = window.location.href.split('/')[4];

  const [knownSubstrateData, setKnownSubstrateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let mounted = true;

    const route = '/knownSubstrates';
    const params = { KPa: kinase };

    getApi(route, params).then((res) => {
      const tableData = res.map(Object.values);

      if (mounted) {
        setKnownSubstrateData(tableData);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  return (
    <>
      {knownSubstrateData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <CardGeneric
          color='primary'
          cardTitle='Known Substrates'
          cardSubtitle='Select a substrate'
        >
          <Table
            className='my-node'
            tableHeaderColor='primary'
            tableHead={['Substrate', 'Sources']}
            tableData={knownSubstrateData}
            rowsPerPage={10}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
        </CardGeneric>
      )}
    </>
  );
};

export default KnownSubstratesTable;
