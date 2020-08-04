import React, { useContext } from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';

import { Typography } from '@material-ui/core';

import { HomeContext } from 'layouts/Home';

import KinaseListRightPanel from 'views/Lists/KinaseList/KinaseListRightPanel';
import PhosphositesOfInterest from 'views/KinaseDetails/Description/PhosphositesOfInterest';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const Description = ({ match }) => {
  const classes = useStyles();

  const kinase = match.path.split('/')[2];
  const kinaseData = useContext(HomeContext).kinaseListContext.kinaseData;

  const kinaseDesc = kinaseData.filter((item) => item['kinase_name'] === kinase)[0];

  return (
    <GridContainer direction='column' style={{ padding: '2em' }}>
      <GridItem>
        <GridContainer direction='row'>
          <GridItem lg={6}>
            <KinaseListRightPanel selectedInfo={kinaseDesc} />
          </GridItem>
          <GridItem lg={3}>
            <Card>
              <CardHeader color='rose'>
                <h4 className={classes.cardTitleWhite}>PLACEHOLDER</h4>
                <p className={classes.cardCategoryWhite}>placeholder</p>
              </CardHeader>
              <CardBody>
                The diverse and highly complex nature of modern phosphoproteomics research produces a high
                volume of data. Chemical phosphoproteomics especially, is amenable to a variety of analytical
                approaches. In this study we propose novel logic-based algorithms that overcome the
                limitations of existing tools used for analysis of these types of datasets. Initially we
                developed a first order deductive, logic-based model and populated it with a scoring system,
                with which we were able to expand from its initially Boolean nature. This allowed us to
                identify 16 previously unreported inhibitor-kinase relationships which could offer novel
                therapeutic targets for
              </CardBody>
            </Card>
          </GridItem>
          <GridItem lg={3}>
            <Card>
              <CardHeader color='rose'>
                <h4 className={classes.cardTitleWhite}>PLACEHOLDER</h4>
                <p className={classes.cardCategoryWhite}>placeholder</p>
              </CardHeader>
              <CardBody>
                The diverse and highly complex nature of modern phosphoproteomics research produces a high
                volume of data. Chemical phosphoproteomics especially, is amenable to a variety of analytical
                approaches. In this study we propose novel logic-based algorithms that overcome the
                limitations of existing tools used for analysis of these types of datasets. Initially we
                developed a first order deductive, logic-based model and populated it with a scoring system,
                with which we were able to expand from its initially Boolean nature. This allowed us to
                identify 16 previously unreported inhibitor-kinase relationships which could offer novel
                therapeutic targets for
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <GridContainer direction='row'>
          <GridItem xs={12} lg={8}>
            <PhosphositesOfInterest protein={kinase} />
          </GridItem>
          <GridItem xs={12} lg={4}>
            <Card>
              <CardHeader color='rose'>
                <h4 className={classes.cardTitleWhite}>PLACEHOLDER</h4>
                <p className={classes.cardCategoryWhite}>placeholder</p>
              </CardHeader>
              <CardBody>
                The diverse and highly complex nature of modern phosphoproteomics research produces a high
                volume of data. Chemical phosphoproteomics especially, is amenable to a variety of analytical
                approaches. In this study we propose novel logic-based algorithms that overcome the
                limitations of existing tools used for analysis of these types of datasets. Initially we
                developed a first order deductive, logic-based model and populated it with a scoring system,
                with which we were able to expand from its initially Boolean nature. This allowed us to
                identify 16 previously unreported inhibitor-kinase relationships which could offer novel
                therapeutic targets for
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default Description;
