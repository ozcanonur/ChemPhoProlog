import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import { CallApi } from 'api/api';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
const useStyles = makeStyles(styles);

const KnownSubstratesTable = ({ match }) => {
  const classes = useStyles();

  const kinase = match.url.split('/')[2];

  const [knownSubstrateData, setKnownSubstrateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let mounted = true;

    const kinaseQuery = `select PsT, sources from known_target where KPa="${kinase}" order by PsT`;

    CallApi(kinaseQuery).then((res) => {
      const tableData = res.map(Object.values);

      if (mounted) {
        setKnownSubstrateData(tableData);
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [kinase]);

  return (
    <React.Fragment>
      {knownSubstrateData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <Card>
          <CardHeader color='warning'>
            <h4 className={classes.cardTitleWhite}>Known Substrates</h4>
            <p className={classes.cardCategoryWhite}>Select a substrate</p>
          </CardHeader>
          <CardBody>
            <Table
              className='my-node'
              tableHeaderColor='warning'
              tableHead={['Substrate', 'Sources']}
              tableData={knownSubstrateData}
              rowsPerPage={10}
              rowEndArrow={false}
              currentPage={currentPage}
              handleChangePage={handleChangePage}
            />
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  );
};

export default KnownSubstratesTable;
