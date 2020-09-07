import React, { useState, useEffect } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';

import { getApi } from 'api/api';
import Lottie from 'react-lottie';
import animationData from 'assets/lottie/loading2.json';

const ObservationData = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const perturbagen = window.location.href.split('/')[4];

  useEffect(() => {
    const route = '/getObservationPerturbagen';
    const params = { perturbagen };

    getApi(route, params).then((res) => {
      setTableData(
        res
          .map((e) => ({
            ...e,
            fold_change: e.fold_change.toFixed(2),
            p_value: e.p_value.toFixed(2),
            cv: e.cv.toFixed(2),
          }))
          .map(Object.values)
      );
    });
  }, [perturbagen]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <div style={{ padding: '2em' }}>
      <CardGeneric color='primary' cardTitle='Perturbagens' cardSubtitle='Select a perturbagen'>
        {tableData.length === 0 ? (
          <Lottie options={defaultOptions} height={500} width={500} />
        ) : (
          <Table
            className='my-node'
            tableHeaderColor='primary'
            tableHead={['Substrate', 'Cell Line', 'Fold change', 'p Value', 'CV']}
            tableData={tableData}
            rowsPerPage={10}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
        )}
      </CardGeneric>
    </div>
  );
};

export default ObservationData;
