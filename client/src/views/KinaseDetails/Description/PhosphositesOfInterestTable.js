import React, { useState, useEffect } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';

import { CallApiForProteinSubstrates } from 'api/api';
import ObservationHeatMap from 'views/KinaseDetails/Description/ObservationHeatMap';

const PhosphositesOfInterestTable = ({ protein }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let mounted = true;

    CallApiForProteinSubstrates(protein).then((res) => {
      if (mounted) {
        setTableData(res.map(Object.values));
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [protein]);

  return (
    <CardGeneric color='primary' cardTitle='Phosphosites of interest' cardSubtitle='Select a phosphosite'>
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
