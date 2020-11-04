import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchFromApi } from 'utils/api';
import CardHeader from 'components/Misc/Card/CardHeader';
import Table from 'components/Misc/CustomTable/Table';
import { addSidebarRoute } from 'actions/main';

interface KnownTarget {
  kinase: string;
  score: number;
  source: string;
}

interface Props {
  perturbagen: string;
}

const KnownTargets = ({ perturbagen }: Props) => {
  const [data, setData] = useState<KnownTarget[]>([]);
  const [loading, setLoading] = useState(false);

  // const perturbagen = window.location.href.split('/')[3];

  const dispatch = useDispatch();
  const history = useHistory();

  // Fetch the data
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchFromApi('/api/knownTargets', { perturbagen }).then((res) => {
      if (mounted) {
        setData(res);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [perturbagen]);

  const clickableCells: {
    [key: string]: (kinaseName: string) => void;
  } = {
    '0': (kinaseName: string) => {
      dispatch(addSidebarRoute('kinase', kinaseName));
      history.push(`/${kinaseName}/description`);
    },
  };

  // Table component wants it in this format
  const tableData = data.map((e) => ({ ...e, score: e.score.toFixed(2) })).map(Object.values);

  return (
    <>
      <CardHeader color='primary' style={{ margin: 0, marginBottom: '1.5rem', fontSize: '18.2px' }}>
        Known Targets
      </CardHeader>
      {tableData.length === 0 && !loading ? (
        <div style={{ marginTop: '1rem', marginLeft: '5px' }}>No Known Targets</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          id={`${perturbagen}_KnownTargets`}
          tableHead={['Kinase', 'Source', 'Score', '']}
          tableData={tableData}
          clickableCells={clickableCells}
          searchIndex={0}
        />
      )}
    </>
  );
};

export default KnownTargets;
