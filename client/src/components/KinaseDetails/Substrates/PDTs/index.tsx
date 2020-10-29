import React from 'react';

import CustomTabs from 'components/Misc/CustomTab/CustomTabs';
import BugReport from '@material-ui/icons/BugReport';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';

import CircularBarPlot from './CircularBarPlot';
import PDTTable from './PDTTable';

const PDTs = (): JSX.Element => {
  const cellLines = ['MCF-7', 'HL-60', 'NTERA-2 clone D1'];

  return (
    <GridContainer direction='column'>
      <GridItem md>
        <GridContainer direction='row'>
          {cellLines.map((cellLine) => (
            <GridItem md key={cellLine}>
              <CircularBarPlot cellLine={cellLine} />
            </GridItem>
          ))}
        </GridContainer>
      </GridItem>
      <GridItem md>
        <CustomTabs
          headerColor='success'
          tabs={cellLines.map((cellLine) => {
            return {
              tabName: cellLine,
              tabIcon: BugReport,
              tabContent: <PDTTable cellLine={cellLine} />,
            };
          })}
        />
      </GridItem>
    </GridContainer>
  );
};

export default PDTs;
