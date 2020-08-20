import React, { useContext, useEffect } from 'react';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import { AppContext } from 'views/App';
import { useSelector, useDispatch } from 'react-redux';
import { pick } from 'lodash';
import { fetchKinaseData } from 'actions';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const KinaseListLeftPanel = () => {
  const classes = useStyles();

  const kinaseData = useSelector((state) => state.kinaseData);
  const tableData = kinaseData
    .map((e) => pick(e, ['kinase_name', 'expressed_in', 'uniprot_id']))
    .map(Object.values);

  const dispatch = useDispatch();
  useEffect(() => {
    if (kinaseData.length === 0) {
      dispatch(fetchKinaseData());
    }
  }, []);

  const { handleSelection, handleAdd, selectedInfo, currentPage, handleChangePage } = useContext(
    AppContext
  ).kinaseListContext;

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
            firstRowOnClick={true}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default KinaseListLeftPanel;
