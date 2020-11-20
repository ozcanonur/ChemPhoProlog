import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Loading from 'components/Misc/Loading/Loading';
import { fetchFromApi } from 'utils/api';
import CardHeader from 'components/Misc/Card/CardHeader';
import Table from 'components/Misc/CustomTable/Table';
import { addSidebarRoute } from 'actions/main';

const useStyles = makeStyles({
  cardHeader: {
    margin: 0,
    marginBottom: '1.5rem',
    fontSize: '18.2px',
  },
  cardHeaderText: {
    marginBottom: '3px',
  },
  notFoundText: {
    marginTop: '1rem',
    marginLeft: '5px',
  },
});

interface KnownTarget {
  kinase: string;
  score: string;
  source: string;
}

interface Props {
  perturbagen: string;
}

const KnownTargets = ({ perturbagen }: Props) => {
  const classes = useStyles();

  const [data, setData] = useState<KnownTarget[]>([]);
  const [loading, setLoading] = useState(false);

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
      dispatch(addSidebarRoute(kinaseName));
      history.push(`/${kinaseName}/description`);
    },
  };

  // Table component wants it in this format
  const tableData = data.map((e) => ({ ...e, score: parseFloat(e.score).toFixed(2) })).map(Object.values);

  return (
    <>
      <CardHeader color='primary' className={classes.cardHeader}>
        <div className={classes.cardHeaderText}>{`Known targets of ${perturbagen}`}</div>
      </CardHeader>
      {tableData.length === 0 && !loading ? (
        <div className={classes.notFoundText}>No Known Targets</div>
      ) : loading ? (
        <Loading />
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
