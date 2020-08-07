import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

const Welcome = () => {
  const classes = useStyles();

  return (
    <GridContainer direction='column' justify='space-between' style={{ padding: '2em' }}>
      <GridItem>
        <Card>
          <CardHeader color='warning' style={{ marginTop: '2em' }}>
            <h4 className={classes.cardTitleWhite}>What is ChemPhoProlog?</h4>
          </CardHeader>
          <CardBody>
            <Typography variant='body1'>
              The diverse and highly complex nature of modern phosphoproteomics research produces a
              high volume of data. Chemical phosphoproteomics especially, is amenable to a variety
              of analytical approaches. In this study we propose novel logic-based algorithms that
              overcome the limitations of existing tools used for analysis of these types of
              datasets. Initially we developed a first order deductive, logic-based model and
              populated it with a scoring system, with which we were able to expand from its
              initially Boolean nature. This allowed us to identify 16 previously unreported
              inhibitor-kinase relationships which could offer novel therapeutic targets for further
              investigation. We also present the model and its findings in a human readable and 18
              explanation-integrated manner. This offers an open-source model blueprint to act as a
              resource 19 for its application in more and diverse data sets.
            </Typography>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader color='warning'>
            <h4 className={classes.cardTitleWhite}>How to navigate?</h4>
          </CardHeader>
          <CardBody>
            <Typography variant='body1'>Just do it.</Typography>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader color='warning'>
            <h4 className={classes.cardTitleWhite}>BezzLab</h4>
          </CardHeader>
          <CardBody>
            <img alt='bezzlab twitter' src={require('../../assets/img/bezzlab_twitter.PNG')} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Welcome;
