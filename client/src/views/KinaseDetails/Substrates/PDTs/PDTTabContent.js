import React, { useState, useEffect } from 'react';
import { CallApiForPDTs } from 'api/api';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import PDTTable from 'views/KinaseDetails/Substrates/PDTs/PDTTable';
import CircularBarPlot from 'views/KinaseDetails/Substrates/PDTs/CircularBarPlot';

const useStyles = makeStyles(styles);

const PDTTabContent = ({ cell_line }) => {
  const classes = useStyles();

  const [PDTs, setPDTs] = useState([]);
  const kinase = window.location.href.split('/')[4];

  useEffect(() => {
    let mounted = true;

    CallApiForPDTs(kinase, cell_line).then((res) => {
      if (mounted) {
        setPDTs(res);
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [kinase, cell_line]);

  let sharedWithList = [];
  for (const entry of PDTs) {
    const shared = entry.shared_with;
    if (shared !== null) sharedWithList.push(shared.split(', '));
  }

  sharedWithList = sharedWithList.flat();

  let sharedWithCount = {};
  for (const shared of sharedWithList) {
    sharedWithCount[shared] = (sharedWithCount[shared] || 0) + 1;
  }

  let chartData = Object.entries(sharedWithCount).map((e) => {
    return {
      Kinase: e[0],
      Count: e[1],
    };
  });

  chartData = chartData.sort((x, y) => y.Count - x.Count);

  return (
    <GridContainer direction='column'>
      <GridItem md>
        <Card>
          <CardHeader color='info'>
            <h4 className={classes.cardTitleWhite}>{`PDT Commonality`}</h4>
            <p className={classes.cardCategoryWhite}>{`Between ${kinase} and other kinases`}</p>
          </CardHeader>
          <CardBody>
            <CircularBarPlot data={chartData} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md>
        <PDTTable tableData={PDTs.map(Object.values)} cell_line={cell_line} />
      </GridItem>
    </GridContainer>
  );
};

export default PDTTabContent;
