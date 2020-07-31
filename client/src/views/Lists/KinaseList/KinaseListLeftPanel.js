import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const KinaseListLeftPanel = ({ tableData, handleSelection, selectedInfo }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Kinases</h4>
        <p className={classes.cardCategoryWhite}>Select a kinase</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='warning'
          tableHead={['Sites', 'Name', 'Expressed', 'Uniprot ID', '']}
          tableData={tableData}
          rowsPerPage={10}
          collapsible={true}
          rowEndArrow={true}
          handleSelection={handleSelection}
          selectedInfo={selectedInfo}
        />
      </CardBody>
    </Card>
  );
};

export default KinaseListLeftPanel;
