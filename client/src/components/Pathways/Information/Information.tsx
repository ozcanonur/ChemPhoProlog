import React from 'react';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';

import PathsTable from './PathsTable';
import PathExplanation from './PathExplanation';
import WaffleChart from './WaffleChart';

const Information = () => {
  return (
    <GridContainer direction='row'>
      <GridItem xs={12} lg={6}>
        <PathsTable />
        <WaffleChart />
      </GridItem>
      <GridItem xs={12} lg={6}>
        <PathExplanation />
      </GridItem>
    </GridContainer>
  );
};

export default Information;
