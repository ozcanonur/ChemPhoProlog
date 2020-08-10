import React from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs';
import BugReport from '@material-ui/icons/BugReport';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import CircularBarPlot from 'views/KinaseDetails/Substrates/PDTs/CircularBarPlot';
import PDTTable from 'views/KinaseDetails/Substrates/PDTs/PDTTable';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
const useStyles = makeStyles(styles);

const PDTs = () => {
  const classes = useStyles();

  const kinase = window.location.href.split('/')[4];

  return (
    <GridContainer direction='column'>
      <GridItem md>
        <GridContainer direction='row'>
          <GridItem md>
            <Card>
              <CardHeader color='info'>
                <h4 className={classes.cardTitleWhite}>{`PDT Commonality in MCF-7`}</h4>
                <p className={classes.cardCategoryWhite}>{`Between ${kinase} and other kinases`}</p>
              </CardHeader>
              <CardBody>
                <CircularBarPlot cell_line={'MCF-7'} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md>
            <Card>
              <CardHeader color='info'>
                <h4 className={classes.cardTitleWhite}>{`PDT Commonality in HL-60`}</h4>
                <p className={classes.cardCategoryWhite}>{`Between ${kinase} and other kinases`}</p>
              </CardHeader>
              <CardBody>
                <CircularBarPlot cell_line={'HL-60'} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md>
            <Card>
              <CardHeader color='info'>
                <h4 className={classes.cardTitleWhite}>{`PDT Commonality in NTERA-2 clone D1`}</h4>
                <p className={classes.cardCategoryWhite}>{`Between ${kinase} and other kinases`}</p>
              </CardHeader>
              <CardBody>
                <CircularBarPlot cell_line={'NTERA-2 clone D1'} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem md>
        <CustomTabs
          headerColor='rose'
          tabs={[
            {
              tabName: `MCF-7`,
              tabIcon: BugReport,
              tabContent: <PDTTable cell_line={'MCF-7'} />,
            },
            {
              tabName: `HL-60`,
              tabIcon: BugReport,
              tabContent: <PDTTable cell_line={'HL-60'} />,
            },
            {
              tabName: `NTERA-2 clone D1`,
              tabIcon: BugReport,
              tabContent: <PDTTable cell_line={'NTERA-2 clone D1'} />,
            },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

export default PDTs;
