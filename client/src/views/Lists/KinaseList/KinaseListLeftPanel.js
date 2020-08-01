import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { HomeContext } from 'layouts/Home';

const useStyles = makeStyles(styles);

const KinaseListLeftPanel = () => {
  const classes = useStyles();

  const tableData = useContext(HomeContext).kinaseListContext.tableData;
  const handleSelection = useContext(HomeContext).kinaseListContext.handleSelection;
  const handleAdd = useContext(HomeContext).kinaseListContext.handleAdd;
  const selectedInfo = useContext(HomeContext).kinaseListContext.selectedInfo;
  const currentPage = useContext(HomeContext).kinaseListContext.currentPage;
  const handleChangePage = useContext(HomeContext).kinaseListContext.handleChangePage;

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
          handleAdd={handleAdd}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      </CardBody>
    </Card>
  );
};

export default KinaseListLeftPanel;
