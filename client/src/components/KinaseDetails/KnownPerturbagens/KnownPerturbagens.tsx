import React, { useEffect, useState } from 'react';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

interface KnownPerturbagen {
  perturbagen: string;
  score: number;
  source: string;
}

const KnownPerturbagens = (): JSX.Element => {
  const [data, setData] = useState<KnownPerturbagen[]>([]);

  const kinase = window.location.href.split('/')[3];

  // Fetch the data
  useEffect(() => {
    let mounted = true;

    axios
      .get('/api/knownPerturbagens', { params: { kinase } })
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [kinase]);

  // Table wants the data in this format :/
  const tableData = data
    .map((e) => ({ ...e, score: e.score.toFixed(2) }))
    .map(Object.values);

  return (
    <GridContainer
      direction='row'
      justify='space-between'
      style={{ padding: '2em' }}
    >
      <GridItem md>
        <CardGeneric
          color='primary'
          cardTitle='Known Perturbagens'
          cardSubtitle='Select a perturbagen'
        >
          {tableData.length === 0 ? (
            <div>No entries found</div>
          ) : (
            <Table
              id={`${kinase}_KnownPerturbagens`}
              tableHead={['Perturbagen', 'Source', 'Score']}
              tableData={tableData}
            />
          )}
        </CardGeneric>
      </GridItem>
      <GridItem md>
        <CardGeneric
          color='primary'
          cardTitle='Perturbagen Info'
          cardSubtitle='Details'
        >
          <Typography variant='body1'>
            The diverse and highly complex nature of modern phosphoproteomics
            research produces a high volume of data. Chemical phosphoproteomics
            especially, is amenable to a variety of analytical approaches. In
            this study we propose novel logic-based algorithms that overcome the
            limitations of existing tools used for analysis of these types of
            datasets. Initially we developed a first order deductive,
            logic-based model and populated it with a scoring system, with which
            we were able to expand from its initially Boolean nature. This
            allowed us to identify 16 previously unreported inhibitor-kinase
            relationships which could offer novel therapeutic targets for
            further investigation. We also present the model and its findings in
            a human readable and 18 explanation-integrated manner. This offers
            an open-source model blueprint to act as a resource 19 for its
            application in more and diverse data sets.
          </Typography>
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default KnownPerturbagens;
