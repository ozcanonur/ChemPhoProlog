import React, { useState, useEffect } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';

import { getApi } from 'api/api';
import ObservationHeatMap from 'views/KinaseDetails/Description/ObservationHeatMap';

const PhosphositesOfInterestTable = ({ kinase }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let mounted = true;
    const route = '/phosphosites';
    const params = { kinase, detailed: true };

    getApi(route, params).then((res) => {
      if (mounted) setTableData(res.map(Object.values));
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  return (
    <CardGeneric
      color='primary'
      cardTitle={`Phosphosites on ${kinase}`}
      cardSubtitle='Select a phosphosite'
    >
      {tableData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <Table
          className='my-node'
          tableHeaderColor='primary'
          tableHead={[
            'Obs. Data',
            'Location',
            'Residue',
            'Detected in',
            'Pst_effect',
            'Reported Substrate of',
            'Reported PDT of',
          ]}
          tableData={tableData}
          rowsPerPage={10}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          ExtraContent={ObservationHeatMap}
        />
      )}
    </CardGeneric>
  );
};

export default PhosphositesOfInterestTable;
