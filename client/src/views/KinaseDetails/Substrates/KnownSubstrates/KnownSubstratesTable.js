import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Table from 'components/Table/Table';

import { CallApi } from 'api/api';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const KnownSubstratesTable = () => {
  const classes = useStyles();

  const kinase = window.location.href.split('/')[4];

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
    <>
      {knownSubstrateData.length === 0 ? (
        <div>No entries found.</div>
      ) : (
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Known Substrates</h4>
            <p className={classes.cardCategoryWhite}>Select a substrate</p>
          </CardHeader>
          <CardBody>
            <Table
              className='my-node'
              tableHeaderColor='primary'
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
    </>
  );
};

export default KnownSubstratesTable;
