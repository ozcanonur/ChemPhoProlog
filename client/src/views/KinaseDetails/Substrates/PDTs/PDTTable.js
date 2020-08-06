import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const PDTTable = ({ tableData }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Putative Downstream Targets</h4>
        <p className={classes.cardCategoryWhite}>Select a substrate</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='warning'
          tableHead={['', 'Substrate', 'Protein Name', 'Confidence', 'Shared with']}
          tableData={tableData}
          rowsPerPage={10}
          rowEndArrow={false}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          expandable={true}
        />
      </CardBody>
    </Card>
  );
};

export default PDTTable;
