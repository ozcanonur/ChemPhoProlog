import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { HomeContext } from 'layouts/Home';

const useStyles = makeStyles(styles);

const PerturbagenListLeftPanel = () => {
  const classes = useStyles();

  const tableData = useContext(HomeContext).perturbagenListContext.tableData;
  const selectedInfo = useContext(HomeContext).perturbagenListContext.selectedInfo;
  const handleSelection = useContext(HomeContext).perturbagenListContext.handleSelection;
  const handleAdd = useContext(HomeContext).perturbagenListContext.handleAdd;
  const currentPage = useContext(HomeContext).perturbagenListContext.currentPage;
  const handleChangePage = useContext(HomeContext).perturbagenListContext
    .handleChangePage;

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Perturbagens</h4>
        <p className={classes.cardCategoryWhite}>Select a perturbagen</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='warning'
          tableHead={['Name', 'Chemspider ID', 'Action', 'Synonyms', '']}
          tableData={tableData}
          rowsPerPage={10}
          collapsible={false}
          rowEndArrow={true}
          handleSelection={handleSelection}
          handleAdd={handleAdd}
          selectedInfo={selectedInfo}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      </CardBody>
    </Card>
  );
};

export default PerturbagenListLeftPanel;