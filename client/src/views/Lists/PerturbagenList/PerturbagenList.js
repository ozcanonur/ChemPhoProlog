import React from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Typography from '@material-ui/core/Typography';
import PerturbagenListLeftPanel from 'views/Lists/PerturbagenList/PerturbagenListLeftPanel';
import PerturbagenListRightPanel from 'views/Lists/PerturbagenList/PerturbagenListRightPanel';

import { Slide } from '@material-ui/core';

export default function PerturbagenList({
  tableData,
  selectedInfo,
  handleSelection,
  rightPanelOpen,
}) {
  return (
    <div>
      <GridContainer
        direction='column'
        justify='space-between'
        style={{ padding: '2em' }}
      >
        <GridItem md>
          <Card>
            <CardBody>
              <Typography variant='body1'>
                ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff. ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff. ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md>
          <GridContainer direction='row'>
            <GridItem md>
              <PerturbagenListLeftPanel
                tableData={tableData}
                handleSelection={handleSelection}
              />
            </GridItem>
            <GridItem md>
              <Slide in={rightPanelOpen} direction='left'>
                <div>
                  <PerturbagenListRightPanel selectedInfo={selectedInfo} />
                </div>
              </Slide>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
