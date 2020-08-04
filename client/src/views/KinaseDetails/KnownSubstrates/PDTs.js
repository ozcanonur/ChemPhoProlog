import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CustomTabs from 'components/CustomTabs/CustomTabs';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import { Typography } from '@material-ui/core';
import BugReport from '@material-ui/icons/BugReport';

import PDTTable from 'views/KinaseDetails/KnownSubstrates/PDTTable';
import { CallApi } from 'api/api';

import { pick } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const PDTs = ({ match }) => {
  const classes = useStyles();

  const kinase = match.url.split('/')[2];

  const [knownSubstrateData, setKnownSubstrateData] = useState([]);

  useEffect(() => {
    const kinaseQuery = `select substrate, source, cell_line, confidence from KS_relationship where kinase="${kinase}" and source="PDT" order by substrate`;

    CallApi(kinaseQuery).then((res) => {
      setKnownSubstrateData(res);
    });
  }, [kinase]);

  const createTableDataByCellLine = (data, cell_line) => {
    const dataByCellLine = data.filter((e) => e.cell_line === cell_line);
    return dataByCellLine.map((e) => pick(e, ['substrate', 'source', 'confidence'])).map(Object.values);
  };

  const tableData_MCF7 = createTableDataByCellLine(knownSubstrateData, 'MCF-7');
  const tableData_HL60 = createTableDataByCellLine(knownSubstrateData, 'HL-60');
  const tableData_NTERA = createTableDataByCellLine(knownSubstrateData, 'NTERA-2 clone D1');

  return (
    <GridContainer>
      <GridItem md>
        <CustomTabs
          headerColor='rose'
          tabs={[
            {
              tabName: `MCF-7 (${tableData_MCF7.length})`,
              tabIcon: BugReport,
              tabContent: <PDTTable tableData={tableData_MCF7} />,
            },
            {
              tabName: `HL-60 (${tableData_HL60.length})`,
              tabIcon: BugReport,
              tabContent: <PDTTable tableData={tableData_HL60} />,
            },
            {
              tabName: `NTERA-2 clone (${tableData_NTERA.length})`,
              tabIcon: BugReport,
              tabContent: <PDTTable tableData={tableData_NTERA} />,
            },
          ]}
        />
      </GridItem>
      <GridItem md>
        <GridContainer direction='column'>
          <GridItem md>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Substrate specification</h4>
                <p className={classes.cardCategoryWhite}>Details</p>
              </CardHeader>
              <CardBody>
                <Typography variant='body1'>
                  The diverse and highly complex nature of modern phosphoproteomics research produces a high
                  volume of data. Chemical phosphoproteomics especially, is amenable to a variety of
                  analytical approaches. In this study we propose novel logic-based algorithms that overcome
                  the limitations of existing tools used for analysis of these types of datasets. Initially we
                  developed a first order deductive, logic-based model and populated it with a scoring system,
                  with which we were able to expand from its initially Boolean nature. This allowed us to
                  identify 16 previously unreported inhibitor-kinase relationships which could offer novel
                  therapeutic targets for further investigation. We also present the model and its findings in
                  a human readable and 18 explanation-integrated manner. This offers an open-source model
                  blueprint to act as a resource 19 for its application in more and diverse data sets.
                </Typography>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Substrate specification</h4>
                <p className={classes.cardCategoryWhite}>Details</p>
              </CardHeader>
              <CardBody>
                <Typography variant='body1'>
                  The diverse and highly complex nature of modern phosphoproteomics research produces a high
                  volume of data. Chemical phosphoproteomics especially, is amenable to a variety of
                  analytical approaches. In this study we propose novel logic-based algorithms that overcome
                  the limitations of existing tools used for analysis of these types of datasets. Initially we
                  developed a first order deductive, logic-based model and populated it with a scoring system,
                  with which we were able to expand from its initially Boolean nature. This allowed us to
                  identify 16 previously unreported inhibitor-kinase relationships which could offer novel
                  therapeutic targets for further investigation. We also present the model and its findings in
                  a human readable and 18 explanation-integrated manner. This offers an open-source model
                  blueprint to act as a resource 19 for its application in more and diverse data sets.
                </Typography>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default PDTs;
