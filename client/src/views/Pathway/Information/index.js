import React from 'react';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathsTable from 'views/Pathway/Information/PathsTable';
import PathExplanation from 'views/Pathway/Information/PathExplanation';

const Information = () => {
  return (
    <GridContainer direction='row'>
      <GridItem md>
        <PathsTable />
      </GridItem>
      <GridItem md>
        <PathExplanation />
      </GridItem>
    </GridContainer>
  );
};

export default Information;
