/* eslint-disable no-nested-ternary */
import React from 'react';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathwayInputs from 'views/Pathway/Inputs/';
import PathwayInformation from 'views/Pathway/Information/';
import Main from 'views/Pathway/Main/';

const PathwayIndex = () => (
  <div style={{ padding: '2em' }}>
    <GridContainer direction='column'>
      <GridItem>
        <PathwayInputs />
      </GridItem>
      <GridItem>
        <GridContainer direction='column'>
          <GridItem>
            <Main />
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
