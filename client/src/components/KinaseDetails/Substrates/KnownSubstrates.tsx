import React, { useEffect, useState } from 'react';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';

import axios from 'axios';

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
            tableHead={['Substrate', 'Sources']}
            tableData={tableData}
            searchIndex={0}
          />
        </CardGeneric>
      )}
    </>
  );
};

export default KnownSubstratesTable;
