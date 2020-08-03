import React, { useEffect, useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import CallApi from 'api/api';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
const useStyles = makeStyles(styles);

const KnownSubstratesTable = ({ match }) => {
  console.log(match);
  const classes = useStyles();

  const kinase = match.url.split('/')[2];

  const [knownSubstrateData, setKnownSubstrateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // const kinaseData = useContext(HomeContext).kinaseListContext.tableData;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const kinaseQuery = `select substrate, source from KS_relationship where kinase="${kinase}" and source="UniProt" order by substrate`;

    CallApi(kinaseQuery).then((res) => {
      const tableData = res.map(Object.values);

      setKnownSubstrateData(tableData);
    });
  }, [kinase]);

  return (
    <Card>
      <CardHeader color='warning'>
        <h4 className={classes.cardTitleWhite}>Known Substrates</h4>
        <p className={classes.cardCategoryWhite}>Select a substrate</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='warning'
          tableHead={['Perturbagen', 'Source']}
          tableData={knownSubstrateData}
          rowsPerPage={10}
          rowEndArrow={false}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      </CardBody>
    </Card>
  );
};

export default KnownSubstratesTable;
