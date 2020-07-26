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

export default function PerturbagenList() {
  const classes = useStyles();

  const [perturbagenTableData, setPerturbagenTableData] = useState([]);

  const callApi = async () => {
    const response = await axios.get('/api/api', {
      params: {
        query: 'Select * from Perturbagen group by name order by name',
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
            <CardBody>
              <Typography variant='body1'>
                ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff. ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff. ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <CardHeader color='warning' style={{ marginTop: '2em' }}>
              <h4 className={classes.cardTitleWhite}>Perturbagens</h4>
              <p className={classes.cardCategoryWhite}>List of all perturbagens</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='warning'
                tableHead={['Name', 'chemspider_id', 'Action', 'Synonyms']}
                tableData={perturbagenTableData}
                rowsPerPage={10}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
