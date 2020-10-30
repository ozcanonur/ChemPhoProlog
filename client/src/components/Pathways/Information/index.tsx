import React from 'react';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';

import PathsTable from 'components/Pathways/Information/PathsTable';
import PathExplanation from 'components/Pathways/Information/PathExplanation';
import WaffleChart from 'components/Pathways/Information/WaffleChart';

const Information = (): JSX.Element => {
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
