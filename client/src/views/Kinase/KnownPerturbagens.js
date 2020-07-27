import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';

import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function PerturbagenList({ match }) {
  const classes = useStyles();

  const [perturbagenTableData, setPerturbagenTableData] = useState([]);

  const currKinase = match.path.split('/')[2];

  const callApi = async () => {
    const response = await axios.get('/api/api', {
      params: {
        query: `Select perturbagen, source, score from PK_relationship where kinase="${currKinase}"`,
      },
    });

    const body = await response.data;

    if (response.status !== 200) throw Error(response.statusText);

    return body;
  };

  useEffect(() => {
    let subscribed = true;

    callApi().then((res) => {
      if (subscribed) {
        setPerturbagenTableData(res.map(Object.values));
      }
    });

    return () => (subscribed = false);
  }, []);

  return (
    <div>
      <GridContainer
        direction='column'
        justify='space-between'
        style={{ padding: '2em' }}
      >
        <GridItem>
          <Card>
            <CardHeader color='warning' style={{ marginTop: '2em' }}>
              <h4 className={classes.cardTitleWhite}>
                {`Known Perturbagens for ${currKinase}`}
              </h4>
              <p className={classes.cardCategoryWhite}>List of all known perturbagens</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='warning'
                tableHead={['Perturbagen', 'source', 'score']}
                tableData={perturbagenTableData}
                rowsPerPage={5}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
