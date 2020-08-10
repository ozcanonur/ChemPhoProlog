import React, { useState, useEffect } from 'react';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import { CallApiForPDTs } from 'api/api';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
const useStyles = makeStyles(styles);

const PDTTable = ({ cell_line }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

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
          tableHead={['', 'Substrate', 'Protein', 'Confidence', 'Shared with']}
          tableData={PDTs.map(Object.values)}
          rowsPerPage={10}
          rowEndArrow={false}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          expandable={true}
          expandFor={'obsForPDTs'}
          cell_line={cell_line}
        />
      </CardBody>
    </Card>
  );
};

export default PDTTable;