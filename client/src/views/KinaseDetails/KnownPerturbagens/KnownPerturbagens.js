import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import CallApi from 'api/api';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const KnownPerturbagens = ({ match }) => {
  const classes = useStyles();

  const kinase = match.url.split('/')[2];

  const [knownPerturbagenData, setKnownPerturbagenData] = useState([]);

  useEffect(() => {
    const kinaseQuery = `select perturbagen, source, score from PK_relationship where kinase="${kinase}" order by perturbagen`;

    CallApi(kinaseQuery).then((res) => {
      const tableData = res
        .map((e) => ({ ...e, score: e.score.toFixed(2) }))
        .map(Object.values);

      setKnownPerturbagenData(tableData);
    });
  }, [kinase]);

  return (
    <GridContainer direction='row' justify='space-between' style={{ padding: '2em' }}>
      <GridItem md>
        <Card>
          <CardHeader color='warning'>
            <h4 className={classes.cardTitleWhite}>Known Perturbagens</h4>
            <p className={classes.cardCategoryWhite}>Select a perturbagen</p>
          </CardHeader>
          <CardBody>
            <Table
              className='my-node'
              tableHeaderColor='warning'
              tableHead={['Perturbagen', 'Source', 'Score']}
              tableData={knownPerturbagenData}
              rowsPerPage={10}
              rowEndArrow={true}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Perturbagen Info</h4>
            <p className={classes.cardCategoryWhite}>Details</p>
          </CardHeader>
          <CardBody>fdggdsgds</CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default KnownPerturbagens;
