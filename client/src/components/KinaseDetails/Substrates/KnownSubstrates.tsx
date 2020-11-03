import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchFromApi } from 'utils/api';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Button from 'components/Misc/CustomButton/Button';
import Table from 'components/Misc/CustomTable/Table';
import ObservationHeatMap from 'components/KinaseDetails/ObservationHeatMap';
import { setSelectedInputs } from 'actions/pathways';

interface KnownSubstrate {
  PsT: string;
  sources: string;
}

interface SubstratesWithPaths {
  [substrate: string]: string;
}

const KnownSubstratesTable = () => {
  const [data, setData] = useState<KnownSubstrate[]>([]);
  const [substratesWithPaths, setSubstratesWithPaths] = useState<SubstratesWithPaths>({});

  console.log(substratesWithPaths);
  const kinase = window.location.href.split('/')[3];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetchFromApi('/api/knownSubstrates', { KPa: kinase }),
      fetchFromApi('/apiWeb/substratesWithPaths', { kinase }),
    ]).then(([resKnownSubstrates, resSubstratesWithPaths]) => {
      if (mounted && resKnownSubstrates && resSubstratesWithPaths) {
        setData(resKnownSubstrates);
        setSubstratesWithPaths(resSubstratesWithPaths);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const substrate = row[0];

    const goToPathways = (cellLine: string) => {
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

    const cellLinesWithValidPaths = substratesWithPaths[substrate];

    return (
      <>
        {cellLinesWithValidPaths
          ? cellLinesWithValidPaths.split(',').map((cellLine: string) => (
              <Button
                key={cellLine}
                onClick={() => goToPathways(cellLine)}
                size='sm'
                style={{
                  backgroundColor: 'rgba(45, 65, 89, 0.7)',
                  boxShadow: '0,3px,5px,0,rgba(0,0,0,0.2)',
                }}
              >
                <div>{cellLine}</div>
              </Button>
            ))
          : null}
      </>
    );
  };

  const tableData = data.map(Object.values);

  return (
    <>
      {tableData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <CardGeneric color='primary' cardTitle='Known Substrates' cardSubtitle='Select a substrate'>
          <Table
            id={`${kinase}_KnownSubstrates`}
            tableHead={['Obs.Data', 'Substrate', 'Sources', 'Go to Pathway']}
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
