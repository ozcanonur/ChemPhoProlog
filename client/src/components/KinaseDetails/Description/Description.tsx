import React, { useState, useEffect } from 'react';

import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import axios from 'axios';

import ObservationHeatMap from './ObservationHeatMap';

interface PhosphositeOnKinase {
  detected_in: string;
  location: number;
  pst_effect: string;
  reported_pdt_of: string | null;
  reported_substrate_of: string | null;
  residue: string;
}

const Description = (): JSX.Element => {
  const kinase = window.location.href.split('/')[3];

  const [data, setData] = useState<PhosphositeOnKinase[]>([]);

  // Fetch the data
  useEffect(() => {
    let mounted = true;

    axios
      .get('/api/phosphosites', { params: { kinase, detailed: true } })
      .then((res) => {
        if (mounted) setData(res.data);
      });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  // Table component wants it in this format :/
  const tableData = data.map(Object.values);

  return (
    <GridContainer direction='column' style={{ padding: '2em' }}>
      <GridItem>
        <CardGeneric
          color='primary'
          cardTitle='PLACEHOLDER'
          cardSubtitle='placeholder'
        >
          The diverse and highly complex nature of modern phosphoproteomics
          research produces a high volume of data. Chemical phosphoproteomics
          especially, is amenable to a variety of analytical approaches. In this
          study we propose novel logic-based algorithms that overcome the
          limitations of existing tools used for analysis of these types of
          datasets. Initially we developed a first order deductive, logic-based
          model and populated it with a scoring system, with which we were able
          to expand from its initially Boolean nature. This allowed us to
          identify 16 previously unreported inhibitor-kinase relationships which
          could offer novel therapeutic targets for
        </CardGeneric>
      </GridItem>
      <GridItem>
        <CardGeneric
          color='primary'
          cardTitle={`Phosphosites on ${kinase}`}
          cardSubtitle='Select a phosphosite'
        >
          {tableData.length === 0 ? (
            <div>No entries found.</div>
          ) : (
            <Table
              id={`${kinase}_PhosphositesOfInterest`}
              tableHead={[
                'Obs. Data',
                'Location',
                'Residue',
                'Detected in',
                'Pst_effect',
                'Reported Substrate of',
                'Reported PDT of',
              ]}
              tableData={tableData}
              RowExpandableContentLeft={ObservationHeatMap}
              searchIndex={0}
            />
          )}
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default Description;
