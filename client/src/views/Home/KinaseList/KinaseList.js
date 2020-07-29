import React, { useEffect, useState } from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';

import { Typography } from '@material-ui/core';
import { pick } from 'lodash';

import KinaseListRightPanel from './KinaseListRightPanel';
import KinaseListLeftPanel from './KinaseListLeftPanel';
import CallApi from 'api/api';

// import { CSSTransition } from 'react-transition-group';
// import './animation.css';

// Kinase List on the Home page
export default function KinaseList() {
  // List of the data to be displayed on kinase table
  const [kinaseTableData, setKinaseTableData] = useState([]);
  // Selected kinase info and description dictionary per Uniprot ID
  const [kinaseInfo, setKinaseInfo] = useState('');
  const [kinaseDescDict, setKinaseDescDict] = useState({});

  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Only run on first mount
  // Gets the kinases and details and sets the states for them
  useEffect(() => {
    let needCleanUp = true;

    const apiQuery = 'select * from Protein where kinase_name <> "" order by kinase_name';

    // Get all kinases from DB
    CallApi(apiQuery).then((res) => {
      if (needCleanUp) {
        // Keep only 3 fields from the response
        const kinaseTable = res.map((obj) =>
          pick(obj, ['kinase_name', 'expressed_in', 'uniprot_id'])
        );
        // Set the main table body data
        setKinaseTableData(kinaseTable.map(Object.values));

        // We also need more details for each kinase
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
        // Set the kinase details data
        setKinaseDescDict(descriptionDict);
      }
    });

    // Clean-up
    return () => (needCleanUp = false);
  }, []);

  const handleSelection = (selection) => {
    setRightPanelOpen(true);
    const selectedKinaseDesc = kinaseDescDict.filter(
      (item) => item['kinase_name'] === selection
    );

    setKinaseInfo(selectedKinaseDesc[0]);
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
              <KinaseListLeftPanel
                kinaseTableData={kinaseTableData}
                handleSelection={handleSelection}
              />
            </GridItem>
            <GridItem md>
              {rightPanelOpen ? (
                <KinaseListRightPanel kinaseInfo={kinaseInfo} />
              ) : undefined}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
