import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter.js';
import Danger from 'components/Typography/Danger.js';
import Warning from '@material-ui/icons/Warning';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { Typography } from '@material-ui/core';

import { CSSTransition } from 'react-transition-group';
import './animation.css';

import { pick } from 'lodash';

const useStyles = makeStyles(styles);

// Kinase List on the Home page
export default function KinaseList() {
  const classes = useStyles();

  // List of the data to be displayed on kinase table
  const [kinaseTableData, setKinaseTableData] = useState([]);

  // Selected kinase info and description dictionary per Uniprot ID
  const [selectedKinase, setSelectedKinase] = useState('');
  const [kinaseInfo, setKinaseInfo] = useState('');
  const [kinaseDescDict, setKinaseDescDict] = useState({});

  // Get the kinase list from API
  const callApi = async () => {
    const response = await axios.get('/api/api', {
      params: {
        query: 'select * from Protein where kinase_name <> "" order by kinase_name',
      },
    });

    const body = await response.data;

    if (response.status !== 200) throw Error(response.statusText);

    return body;
  };

  // Set the kinase table list state + cleanup
  useEffect(() => {
    let subscribed = true;

    callApi().then((res) => {
      if (subscribed) {
        const kinaseTable = res.map((obj) =>
          pick(obj, ['kinase_name', 'expressed_in', 'uniprot_id'])
        );
        setKinaseTableData(kinaseTable.map(Object.values));

        const descriptionDict = res.map((obj) =>
          pick(obj, [
            'kinase_name',
            'expressed_in',
            'uniprot_id',
            'gene_synonyms',
            'families',
            'length',
            'description',
          ])
        );
        setKinaseDescDict(descriptionDict);
      }
    });

    return () => (subscribed = false);
  }, []);

  const handleKinaseSelection = (selection) => {
    const selectedKinaseName = kinaseDescDict.filter(
      (item) => item['uniprot_id'] === selection
    );
    setSelectedKinase(selectedKinaseName[0]['kinase_name']);

    const selectedKinaseDesc = kinaseDescDict.filter(
      (item) => item['uniprot_id'] === selection
    );

    setKinaseInfo(selectedKinaseDesc[0]);
  };

  const KinaseInfo = () => {
    return (
      <Card>
        <CardHeader color='primary'>
          <h4 className={classes.cardTitleWhite}>Kinase Specification</h4>
        </CardHeader>
        <CardBody>
          <GridContainer direction='column'>
            <GridItem>
              <Card>
                <CardHeader color='primary' style={{ marginLeft: 0, marginRight: 0 }}>
                  <h4 className={classes.cardTitleWhite}>{kinaseInfo.kinase_name}</h4>
                </CardHeader>
                <CardBody>
                  <p>{kinaseInfo.description}</p>
                  <p>
                    <strong>Families: </strong>
                    {kinaseInfo.families}{' '}
                  </p>
                  <p>
                    <strong>Alternative names: </strong>
                    {kinaseInfo.gene_synonyms}
                  </p>
                  <p>
                    <strong>Detected in: </strong>
                    {kinaseInfo.expressed_in}
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <GridContainer direction='row'>
                <GridItem md>
                  <Card>
                    <CardHeader color='primary' stats icon>
                      <CardIcon color='primary'>
                        <NewReleasesIcon />
                      </CardIcon>
                      <p className={classes.cardCategory}>New perturbagens</p>
                      <h3 className={classes.cardTitle}>12</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Danger>
                          <Warning />
                        </Danger>
                        Previously reported: 24
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md>
                  <Card>
                    <CardHeader color='primary' stats icon>
                      <CardIcon color='primary'>
                        <TrendingDownIcon />
                      </CardIcon>
                      <p className={classes.cardCategory}>New PDTs</p>
                      <h3 className={classes.cardTitle}>51</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Danger>
                          <Warning />
                        </Danger>
                        Previously reported: 14
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  };

  return (
    <div>
      <GridContainer
        direction='column'
        justify='space-between'
        style={{ padding: '2em' }}
      >
        <GridItem md>
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
        <GridItem md>
          <GridContainer direction='row'>
            <GridItem md>
              <Card>
                <CardHeader color='warning'>
                  <h4 className={classes.cardTitleWhite}>Kinases</h4>
                  <p className={classes.cardCategoryWhite}>Select a kinase</p>
                </CardHeader>
                <CardBody>
                  <Table
                    className='my-node'
                    tableHeaderColor='warning'
                    tableHead={['', 'Name', 'Expressed', 'Uniprot ID', '']}
                    tableData={kinaseTableData}
                    rowsPerPage={10}
                    //rowHeight={'100px'}
                    collapsible={true}
                    rowEndArrow={true}
                    handleKinaseSelection={handleKinaseSelection}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md>
              <KinaseInfo />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
