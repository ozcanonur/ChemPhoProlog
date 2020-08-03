import React, { useContext } from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';

import { Typography } from '@material-ui/core';

import { HomeContext } from 'layouts/Home';

import KinaseListRightPanel from 'views/Lists/KinaseList/KinaseListRightPanel';

const Description = ({ match }) => {
  const kinase = match.path.split('/')[2];
  const kinaseData = useContext(HomeContext).kinaseListContext.kinaseData;

  const kinaseDesc = kinaseData.filter((item) => item['kinase_name'] === kinase)[0];

  return (
    <div>
      <GridContainer direction='column' justify='space-between' style={{ padding: '2em' }}>
        <GridItem>
          <Card>
            <CardBody>
              <Typography variant='body1'>
                ChemPhoPro provides a compendium of results and related information obtained from chemical
                phosphoproteomics experiments. And some other stuff. ChemPhoPro provides a compendium of
                results and related information obtained from chemical phosphoproteomics experiments. And some
                other stuff. ChemPhoPro provides a compendium of results and related information obtained from
                chemical phosphoproteomics experiments. And some other stuff.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <KinaseListRightPanel selectedInfo={kinaseDesc} />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Description;
