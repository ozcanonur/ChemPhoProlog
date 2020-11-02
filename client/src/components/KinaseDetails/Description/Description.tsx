/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';

import { fetchFromApi } from 'api/api';
import ObservationHeatMap from './ObservationHeatMap';

interface PhosphositeOnKinase {
  detected_in: string;
  location: number;
  pst_effect: string;
  reported_pdt_of: string | null;
  reported_substrate_of: string | null;
  residue: string;
}

interface KinaseInfo {
  description: string;
  families: string;
  gene_synonyms: string;
  expressed_in: string;
}

const Description = () => {
  const kinase = window.location.href.split('/')[3];

  const [phosphosites, setPhosphosites] = useState<PhosphositeOnKinase[]>([]);
  const [kinaseInfo, setKinaseInfo] = useState<KinaseInfo>({
    description: '',
    families: '',
    gene_synonyms: '',
    expressed_in: '',
  });

  // Fetch the data
  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetchFromApi('/api/phosphosites', {
        kinase,
        detailed: true,
      }),
      fetchFromApi('/apiWeb/kinaseInfo', { kinase }),
    ]).then(([resPho, resKinase]) => {
      if (mounted && resPho && resKinase) {
        setPhosphosites(resPho);
        setKinaseInfo(resKinase);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  // Table component wants it in this format :/
  const tableData = phosphosites.map(Object.values);

  const KinaseDescription = () => {
    return (
      <>
        <p>{kinaseInfo.description}</p>
        <p>
          <strong>Families: </strong>
          {kinaseInfo.families}
        </p>
        <p>
          <strong>Alternative names: </strong>
          {kinaseInfo.gene_synonyms}
        </p>
        <p>
          <strong>Detected in: </strong>
          {kinaseInfo.expressed_in}
        </p>
      </>
    );
  };

  return (
    <GridContainer direction='column' style={{ padding: '2em' }}>
      <GridItem>
        <CardGeneric color='primary' cardTitle={kinase}>
          <KinaseDescription />
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
              RowExpandableContentLeft={ObservationHeatMap(false)}
              searchIndex={0}
            />
          )}
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default Description;
