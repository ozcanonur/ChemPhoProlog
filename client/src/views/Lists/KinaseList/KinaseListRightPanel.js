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
import NewFindingsCard from 'views/Lists/NewFindingsCard';

import { HomeContext } from 'layouts/Home';

const useStyles = makeStyles(styles);

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

  const newFindingsProps = {
    leftIconTitle: 'New Perturbagens',
    leftIconText: 6,
    rightIconTitle: 'New PDTs',
    rightIconText: 24,
  };

  const props = {
    topHeaderTitle: 'Kinase Specification',
    topHeaderSubTitle: 'Details',
    selectedEleTitle: selectedInfo.kinase_name,
    selectedEleDetailsBody: <KinaseDescriptionBody selectedInfo={selectedInfo} />,
    selectedEleDetailsBottomBody: <NewFindingsCard {...newFindingsProps} />,
  };

  return <ListRightPanel {...props} />;
};

export default KinaseListRightPanel;
