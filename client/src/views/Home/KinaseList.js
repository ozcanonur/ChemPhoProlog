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
import Icon from '@material-ui/core/Icon';
import CardFooter from 'components/Card/CardFooter.js';
import Danger from 'components/Typography/Danger.js';
import Warning from '@material-ui/icons/Warning';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

// Kinase List on the Home page
export default function KinaseList() {
  const classes = useStyles();

  // List of the data to be displayed on kinase table
  const [kinaseTableData, setKinaseTableData] = useState([]);

  // Selected kinase info and description dictionary per Uniprot ID
  const [kinaseInfoOpen, setKinaseInfoOpen] = useState(false);
  const [selectedKinase, setSelectedKinase] = useState('');
  const [kinaseInfo, setKinaseInfo] = useState('');
  const [kinaseDescDict, setKinaseDescDict] = useState({});

  // Get the kinase list from API
  const callApi = async () => {
    const response = await axios.get('/api/api', {
      params: {
        query:
          'select kinase_name, expressed_in, uniprot_id, description from Protein where kinase_name <> "" order by kinase_name',
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
        const resultWithoutDesc = res.map(({ description, ...keep }) => keep);
        setKinaseTableData(resultWithoutDesc.map(Object.values));

        const descriptionDict = res.map(({ expressed_in, ...keep }) => keep);
        setKinaseDescDict(descriptionDict);
      }
    });

    return () => (subscribed = false);
  }, []);

  const handleKinaseSelection = (selection) => {
    // Open info panel
    setKinaseInfoOpen(true);

    const selectedKinaseName = kinaseDescDict.filter(
      (item) => item['uniprot_id'] === selection
    );
    setSelectedKinase(selectedKinaseName[0]['kinase_name']);

    const selectedKinaseDesc = kinaseDescDict.filter(
      (item) => item['uniprot_id'] === selection
    );

    setKinaseInfo(selectedKinaseDesc[0].description);
  };

  const KinaseInfo = () => {
    return (
      <Card>
        <CardHeader color='primary' style={{ marginTop: '2em' }}>
          <h4 className={classes.cardTitleWhite}>Kinase Specification</h4>
          <p className={classes.cardCategoryWhite} style={{ fontWeight: 1000 }}>
            {`For ${selectedKinase}`}{' '}
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer direction='column'>
            <GridItem>
              <Card>
                <CardBody>
                  <Typography>{kinaseInfo}</Typography>
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
          <GridContainer direction='row'>
            <GridItem md>
              <Card>
                <CardHeader color='warning' style={{ marginTop: '2em' }}>
                  <h4 className={classes.cardTitleWhite}>Kinases</h4>
                  <p className={classes.cardCategoryWhite}>Select a kinase</p>
                </CardHeader>
                <CardBody>
                  <Table
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
            {kinaseInfoOpen ? (
              <GridItem md>
                <KinaseInfo />
              </GridItem>
            ) : undefined}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
