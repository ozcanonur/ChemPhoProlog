import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Button from 'components/Misc/CustomButton/Button';
import Table from 'components/Misc/CustomTable/Table';
import ObservationHeatMap from 'components/KinaseDetails/Description/ObservationHeatMap';
import { setSelectedInputs } from 'actions/pathways';

interface KnownSubstrate {
  PsT: string;
  sources: string;
}

const KnownSubstratesTable = (): JSX.Element => {
  const [data, setData] = useState<KnownSubstrate[]>([]);

  const kinase = window.location.href.split('/')[3];

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

  const dispatch = useDispatch();
  const history = useHistory();
  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const substrate = row[0];

    const goToPathways = () => {
      dispatch(
        setSelectedInputs({
          substrate,
          cellLine: '',
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
            id={`${kinase}_KnownSubstrates`}
            tableHead={['Obs.Data', 'Substrate', 'Sources']}
            tableData={tableData}
            searchIndex={0}
            RowContentRight={RowContentRight}
            RowExpandableContentLeft={ObservationHeatMap(true)}
          />
        </CardGeneric>
      )}
    </>
  );
};

export default KnownSubstratesTable;
