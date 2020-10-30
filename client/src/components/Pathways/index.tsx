import React from 'react';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';

import PathwayInputs from 'components/Pathways/Inputs';
import PathwayInformation from 'components/Pathways/Information';
import PathwayMain from 'components/Pathways/Main';

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
