import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import axios from 'axios';

import { addSidebarRoute } from 'actions/main';

interface KnownTarget {
  kinase: string;
  score: number;
  source: string;
}

const KnownTargets = (): JSX.Element => {
  const [data, setData] = useState<KnownTarget[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const perturbagen = window.location.href.split('/')[3];

  // Fetch the data
  useEffect(() => {
    let mounted = true;

    axios
      .get('/api/knownTargets', { params: { perturbagen } })
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [perturbagen]);

  const handlePageChange = (_event: Event, newPage: number) => {
    setCurrentPage(newPage);
  };

  const dispatch = useDispatch();
  const handleKinaseAdd = (kinase: string) => {
    dispatch(addSidebarRoute('kinase', kinase));
  };

  // Table component wants it in this format
  const tableData = data
    .map((e) => ({ ...e, score: e.score.toFixed(2) }))
    .map(Object.values);

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
            tableHeaderColor='primary'
            tableHead={['Kinase', 'Source', 'Score']}
            tableData={tableData}
            rowsPerPage={10}
            collapsible={false}
            currentPage={currentPage}
            firstRowOnClick
            handlePageChange={handlePageChange}
            handleAdd={handleKinaseAdd}
          />
        )}
      </CardGeneric>
    </div>
  );
};

export default KnownTargets;
