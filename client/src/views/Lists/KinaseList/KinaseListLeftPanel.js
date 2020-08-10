import React, { useContext } from 'react';

import { HomeContext } from 'layouts/Home';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const KinaseListLeftPanel = () => {
  const classes = useStyles();

  const {
    tableData,
    handleSelection,
    handleAdd,
    selectedInfo,
    currentPage,
    handleChangePage,
  } = useContext(HomeContext).kinaseListContext;

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Kinases</h4>
        <p className={classes.cardCategoryWhite}>Select a kinase</p>
      </CardHeader>
      <CardBody>
        {tableData === [] ? (
          <div>Loading...</div>
        ) : (
          <Table
            className='my-node'
            tableHeaderColor='warning'
            tableHead={['Sites', 'Name', 'Expressed', 'Uniprot ID', '']}
            tableData={tableData}
            rowsPerPage={10}
            expandable={true}
            expandFor={'kinaseList'}
            rowEndArrow={true}
            handleSelection={handleSelection}
            selectedInfo={selectedInfo}
            handleAdd={handleAdd}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default KinaseListLeftPanel;
