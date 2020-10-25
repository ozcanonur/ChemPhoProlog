import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';

import { getApi } from 'api/api';
import { addSidebarKinase } from 'actions/main';

const KnownTargets = (): JSX.Element => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const dispatch = useDispatch();
  const handleKinaseAdd = (selection) => {
    dispatch(addSidebarKinase(selection));
  };

  const perturbagen = window.location.href.split('/')[4];

  useEffect(() => {
    const route = '/knownTargets';
    const params = { perturbagen };

    getApi(route, params).then((res) => {
      setTableData(
        res.map((e) => ({ ...e, score: e.score.toFixed(2) })).map(Object.values)
      );
    });
  }, [perturbagen]);

  return (
    <div style={{ padding: '2em' }}>
      <CardGeneric
        color='primary'
        cardTitle='Perturbagens'
        cardSubtitle='Select a perturbagen'
      >
        {tableData === [] ? (
          <div>Loading...</div>
        ) : (
          <Table
            className='my-node'
            tableHeaderColor='primary'
            tableHead={['Kinase', 'Source', 'Score']}
            tableData={tableData}
            rowsPerPage={10}
            collapsible={false}
            currentPage={currentPage}
            firstRowOnClick
            handleChangePage={handleChangePage}
            handleAdd={handleKinaseAdd}
          />
        )}
      </CardGeneric>
    </div>
  );
};

export default KnownTargets;
