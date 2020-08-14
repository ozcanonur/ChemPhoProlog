import React, { useContext, useEffect, useState } from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';

import { Typography } from '@material-ui/core';

import KinaseListLeftPanel from 'views/Lists/KinaseList/KinaseListLeftPanel';
import KinaseListRightPanel from 'views/Lists/KinaseList/KinaseListRightPanel';

import { Slide } from '@material-ui/core';

import { AppContext } from 'views/App';

// Kinase List on the Home page
const KinaseList = () => {
  const selectedInfo = useContext(AppContext).kinaseListContext.selectedInfo;

  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  useEffect(() => {
    setRightPanelOpen(false);

    if (selectedInfo !== '') {
      setTimeout(() => {
        setRightPanelOpen(true);
      }, 200);
    }
  }, [selectedInfo]);

  return (
    <div>
      <GridContainer direction='column' justify='space-between' style={{ padding: '2em' }}>
        <GridItem>
          <Card>
            <CardBody>
              <Typography variant='body1'>
                ChemPhoPro provides a compendium of results and related information obtained from
                chemical phosphoproteomics experiments. And some other stuff. ChemPhoPro provides a
                compendium of results and related information obtained from chemical
                phosphoproteomics experiments. And some other stuff. ChemPhoPro provides a
                compendium of results and related information obtained from chemical
                phosphoproteomics experiments. And some other stuff.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <GridContainer direction='row' alignItems='stretch'>
            <GridItem xs={12} lg={6}>
              <KinaseListLeftPanel />
            </GridItem>
            <GridItem xs={12} lg={6}>
              <Slide in={rightPanelOpen} direction='left' mountOnEnter unmountOnExit>
                <div>
                  <KinaseListRightPanel selectedInfo={selectedInfo} />
                </div>
              </Slide>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default KinaseList;
