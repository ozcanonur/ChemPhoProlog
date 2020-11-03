import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'components/Misc/CustomButton/Button';

import { fetchFromApi } from 'utils/api';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import { setSelectedInputs } from 'actions/pathways';
import ObservationBarChart from '../../ObservationBarChart';

interface Props {
  cellLine: string;
}

const PDTTable = ({ cellLine }: Props) => {
  const [PDTs, setPDTs] = useState([]);

  const kinase = window.location.href.split('/')[3];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    fetchFromApi('/api/pdts', { kinase, cell_line: cellLine }).then((res) => {
      if (mounted) setPDTs(res);
    });

    return () => {
      mounted = false;
    };
  }, [kinase, cellLine]);

  const tableData = PDTs.map(Object.values);

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const substrate = row[0];

    const goToPathways = () => {
      dispatch(
        setSelectedInputs({
          substrate,
          cellLine,
          perturbagen: '',
          onlyKinaseEnds: false,
        })
      );
      history.push('/pathways');
    };

    return (
      <Button
        onClick={goToPathways}
        size='sm'
        style={{
          backgroundColor: 'rgba(45, 65, 89, 0.7)',
          boxShadow: '0,3px,5px,0,rgba(0,0,0,0.2)',
        }}
      >
        <div>Go to pathways</div>
      </Button>
    );
  };

  return (
    <CardGeneric
      color='primary'
      cardTitle={`Putative Downstream Targets of ${kinase}`}
      cardSubtitle='Select a substrate'
    >
      {tableData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <Table
          id={`${cellLine}_${kinase}_PDTTable`}
          tableHead={[
            'Obs.Data',
            'Substrate',
            'Protein',
            'Confidence',
            'Shared with',
          ]}
          tableData={tableData}
          RowContentRight={RowContentRight}
          RowExpandableContentLeft={ObservationBarChart(cellLine)}
          searchIndex={0}
        />
      )}
    </CardGeneric>
  );
};

export default PDTTable;
