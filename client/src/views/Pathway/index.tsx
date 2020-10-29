import React from 'react';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';

import PathwayInputs from 'views/Pathway/Inputs/';
import PathwayInformation from 'views/Pathway/Information/';
import PathwayMain from 'views/Pathway/Main/';

const PathwayIndex = (): JSX.Element => (
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
