import React from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs';
import BugReport from '@material-ui/icons/BugReport';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardGeneric from 'components/Card/CardGeneric';

import CircularBarPlot from 'views/KinaseDetails/Substrates/PDTs/CircularBarPlot';
import PDTTable from 'views/KinaseDetails/Substrates/PDTs/PDTTable';

const PDTs = () => {
  const kinase = window.location.href.split('/')[4];

  const CircularCard = ({ cell_line }) => (
    <CardGeneric
      color='primary'
      cardTitle={`PDT Commonality in ${cell_line}`}
      cardSubtitle={`Between ${kinase} and other kinases`}
    >
      <CircularBarPlot cell_line={cell_line} />
    </CardGeneric>
  );

  const cellLines = ['MCF-7', 'HL-60', 'NTERA-2 clone D1'];

  return (
    <GridContainer direction='column'>
      <GridItem md>
        <GridContainer direction='row'>
          {cellLines.map((cellLine, key) => (
            <GridItem md key={key}>
              <CircularCard cell_line={cellLine} />
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
              tabContent: <PDTTable cell_line={cellLine} />,
            };
          })}
        />
      </GridItem>
    </GridContainer>
  );
};

export default PDTs;
