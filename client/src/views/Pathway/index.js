/* eslint-disable no-nested-ternary */
import React from 'react';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathwayInputs from 'views/Pathway/PathwayInputs/index';
import PathDetails from 'views/Pathway/PathDetails';
import PathsTable from 'views/Pathway/PathsTable';
import Pathway from 'views/Pathway/Pathway';
import PathSelectList from 'views/Pathway/PathSelectList';

const PathwayIndex = () => {
  return (
    <div style={{ padding: '2em' }}>
      <GridContainer direction='column'>
        <GridItem>
          <PathwayInputs />
        </GridItem>
        <GridItem>
          <GridContainer direction='column'>
            <GridItem>
              <GridContainer direction='row'>
                <GridItem xs={10}>
                  <Pathway />
                </GridItem>
                <GridItem xs={2}>
                  <PathSelectList />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer direction='row'>
                <GridItem md>
                  <PathsTable />
                </GridItem>
                <GridItem md>
                  <PathDetails />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default PathwayIndex;
