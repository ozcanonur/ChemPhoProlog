import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import { addSidebarRoute } from 'actions/main';

interface KnownTarget {
  kinase: string;
  score: number;
  source: string;
}

const KnownTargets = (): JSX.Element => {
  const [data, setData] = useState<KnownTarget[]>([]);

  const perturbagen = window.location.href.split('/')[3];

  const dispatch = useDispatch();
  const history = useHistory();

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

  // Table component wants it in this format
  const tableData = data
    .map((e) => ({ ...e, score: e.score.toFixed(2) }))
    .map(Object.values);

  const clickableCells: {
    [key: string]: (kinaseName: string) => void;
  } = {
    '0': (kinaseName: string) => {
      dispatch(addSidebarRoute('kinase', kinaseName));
      history.push(`/${kinaseName}/description`);
    },
  };

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
            id={`${perturbagen}_KnownTargets`}
            tableHead={['Kinase', 'Source', 'Score']}
            tableData={tableData}
            clickableCells={clickableCells}
            searchIndex={0}
          />
        )}
      </CardGeneric>
    </div>
  );
};

export default KnownTargets;
