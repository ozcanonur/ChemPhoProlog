import React from 'react';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import PathsTable from 'views/Pathway/Information/PathsTable';
import PathExplanation from 'views/Pathway/Information/PathExplanation';
import WaffleChart from 'views/Pathway/Information/WaffleChart';

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
