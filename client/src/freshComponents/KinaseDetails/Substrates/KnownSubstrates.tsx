import React, { useEffect, useState } from 'react';

import CardGeneric from 'freshComponents/Misc/Card/CardGeneric';
import Table from 'freshComponents/Misc/CustomTable/Table';

import axios from 'axios';

interface KnownSubstrate {
  PsT: string;
  sources: string;
}

const KnownSubstratesTable = (): JSX.Element => {
  const [data, setData] = useState<KnownSubstrate[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const kinase = window.location.href.split('/')[3];

  const handlePageChange = (_event: Event, newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let mounted = true;

    axios
      .get('/api/knownSubstrates', { params: { KPa: kinase } })
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [kinase]);

  const tableData = data.map(Object.values);

  return (
    <>
      {tableData.length === 0 ? (
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
            tableData={tableData}
            rowsPerPage={10}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </CardGeneric>
      )}
    </>
  );
};

export default KnownSubstratesTable;
