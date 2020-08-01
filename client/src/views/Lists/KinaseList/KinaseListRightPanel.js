import React, { useState, useContext } from 'react';

import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter.js';
import Danger from 'components/Typography/Danger.js';
import Warning from '@material-ui/icons/Warning';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import ListRightPanel from 'views/Lists/ListRightPanel';

import { HomeContext } from 'layouts/Home';

const useStyles = makeStyles(styles);

const NewFindingsCard = () => {
  const classes = useStyles();

  const [newPerturbagensHovered, setNewPerturbagensHovered] = useState(false);
  const [newPDTsHovered, setNewPDTsHovered] = useState(false);

  return (
    <GridContainer direction='row'>
      <GridItem md>
        <Card>
          <CardHeader color='primary' stats icon>
            <CardIcon
              color='primary'
              onMouseOver={() => setNewPerturbagensHovered(true)}
              onMouseOut={() => setNewPerturbagensHovered(false)}
              style={{
                transform: `${newPerturbagensHovered ? 'scale(1.2,1.2)' : 'scale(1,1)'}`,
                cursor: 'pointer',
              }}
            >
              {newPerturbagensHovered ? (
                <ArrowForwardIcon
                  style={{
                    pointerEvents: `${newPerturbagensHovered ? 'none' : 'inherit'}`,
                  }}
                />
              ) : (
                <NewReleasesIcon />
              )}
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
            <CardIcon
              color='primary'
              onMouseOver={() => setNewPDTsHovered(true)}
              onMouseOut={() => setNewPDTsHovered(false)}
              style={{
                transform: `${newPDTsHovered ? 'scale(1.2,1.2)' : 'scale(1,1)'}`,
                cursor: 'pointer',
              }}
            >
              {newPDTsHovered ? (
                <ArrowForwardIcon
                  style={{
                    pointerEvents: `${newPDTsHovered ? 'none' : 'inherit'}`,
                  }}
                />
              ) : (
                <TrendingDownIcon />
              )}
            </CardIcon>
            <p className={classes.cardCategory}>New PDTs</p>
            <h3 className={classes.cardTitle}>51</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <Danger>
                <Warning />
              </Danger>
              Previously reported direct substrates: 14
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const KinaseDescriptionBody = ({ selectedInfo }) => {
  return (
    <React.Fragment>
      <p>{selectedInfo.description}</p>
      <p>
        <strong>Families: </strong>
        {selectedInfo.families}
      </p>
      <p>
        <strong>Alternative names: </strong>
        {selectedInfo.gene_synonyms}{' '}
      </p>
      <p>
        <strong>Detected in: </strong>
        {selectedInfo.expressed_in}{' '}
      </p>
    </React.Fragment>
  );
};

const KinaseListRightPanel = () => {
  const selectedInfo = useContext(HomeContext).kinaseListContext.selectedInfo;

  const props = {
    topHeaderTitle: 'Kinase Specification',
    topHeaderSubTitle: 'Details',
    selectedEleTitle: selectedInfo.kinase_name,
    selectedEleDetailsBody: <KinaseDescriptionBody selectedInfo={selectedInfo} />,
    selectedEleDetailsBottomBody: <NewFindingsCard />,
  };

  return <ListRightPanel {...props} />;
};

export default KinaseListRightPanel;
