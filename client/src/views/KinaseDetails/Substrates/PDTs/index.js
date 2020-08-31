import React from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs';
import BugReport from '@material-ui/icons/BugReport';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import CircularBarPlot from 'views/KinaseDetails/Substrates/PDTs/CircularBarPlot';
import PDTTable from 'views/KinaseDetails/Substrates/PDTs/PDTTable';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const PDTs = () => {
  const classes = useStyles();

  const kinase = window.location.href.split('/')[4];

  const CircularCard = ({ cell_line }) => (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>{`PDT Commonality in ${cell_line}`}</h4>
        <p className={classes.cardCategoryWhite}>{`Between ${kinase} and other kinases`}</p>
      </CardHeader>
      <CardBody>
        <CircularBarPlot cell_line={cell_line} />
      </CardBody>
    </Card>
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
