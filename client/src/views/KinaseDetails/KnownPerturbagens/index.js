import React, { useEffect, useState } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Typography from '@material-ui/core/Typography';

import { CallApi } from 'api/api';

const KnownPerturbagens = () => {
  const kinase = window.location.href.split('/')[4];

  const [knownPerturbagenData, setKnownPerturbagenData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let mounted = true;

    const kinaseQuery = `select perturbagen, source, score from PK_relationship where kinase="${kinase}" order by perturbagen`;

    CallApi(kinaseQuery).then((res) => {
      const tableData = res.map((e) => ({ ...e, score: e.score.toFixed(2) })).map(Object.values);
      if (mounted) {
        setKnownPerturbagenData(tableData);
      }
    });

    return () => {
      mounted = false;
    };
  }, [kinase]);

  return (
    <GridContainer direction='row' justify='space-between' style={{ padding: '2em' }}>
      <GridItem md>
        <CardGeneric color='primary' cardTitle='Known Perturbagens' cardSubtitle='Select a perturbagen'>
          {knownPerturbagenData.length === 0 ? (
            <div>No entries found</div>
          ) : (
            <Table
              className='my-node'
              tableHeaderColor='primary'
              tableHead={['Perturbagen', 'Source', 'Score']}
              tableData={knownPerturbagenData}
              rowsPerPage={10}
              currentPage={currentPage}
              handleChangePage={handleChangePage}
            />
          )}
        </CardGeneric>
      </GridItem>
      <GridItem md>
        <CardGeneric color='primary' cardTitle='Perturbagen Info' cardSubtitle='Details'>
          <Typography variant='body1'>
            The diverse and highly complex nature of modern phosphoproteomics research produces a high volume of data.
            Chemical phosphoproteomics especially, is amenable to a variety of analytical approaches. In this study we
            propose novel logic-based algorithms that overcome the limitations of existing tools used for analysis of
            these types of datasets. Initially we developed a first order deductive, logic-based model and populated it
            with a scoring system, with which we were able to expand from its initially Boolean nature. This allowed us
            to identify 16 previously unreported inhibitor-kinase relationships which could offer novel therapeutic
            targets for further investigation. We also present the model and its findings in a human readable and 18
            explanation-integrated manner. This offers an open-source model blueprint to act as a resource 19 for its
            application in more and diverse data sets.
          </Typography>
        </CardGeneric>
      </GridItem>
    </GridContainer>
  );
};

export default KnownPerturbagens;
