import React from 'react';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathwayInputs from 'views/Pathway/Inputs/';
import PathwayInformation from 'views/Pathway/Information/';
import PathwayMain from 'views/Pathway/Main/';

const PathwayIndex = () => (
  <div style={{ padding: '2em' }}>
    <GridContainer direction='column'>
      <GridItem>
        <PathwayInputs />
      </GridItem>
      <GridItem>
        <GridContainer direction='column'>
          <GridItem>
            <PathwayMain />
          </GridItem>
          <GridItem>
            <PathwayInformation />
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  </div>
);

export default PathwayIndex;
