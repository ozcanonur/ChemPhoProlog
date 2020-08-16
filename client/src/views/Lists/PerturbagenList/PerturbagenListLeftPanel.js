import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { AppContext } from 'views/App';

const useStyles = makeStyles(styles);

const PerturbagenListLeftPanel = () => {
  const classes = useStyles();

  const tableData = useContext(AppContext).perturbagenListContext.tableData;
  const selectedInfo = useContext(AppContext).perturbagenListContext.selectedInfo;
  const handleSelection = useContext(AppContext).perturbagenListContext.handleSelection;
  const handleAdd = useContext(AppContext).perturbagenListContext.handleAdd;
  const currentPage = useContext(AppContext).perturbagenListContext.currentPage;
  const handleChangePage = useContext(AppContext).perturbagenListContext.handleChangePage;

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Perturbagens</h4>
        <p className={classes.cardCategoryWhite}>Select a perturbagen</p>
      </CardHeader>
      <CardBody>
        {tableData === [] ? (
          <div>Loading...</div>
        ) : (
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
            firstRowOnClick={true}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default PerturbagenListLeftPanel;
