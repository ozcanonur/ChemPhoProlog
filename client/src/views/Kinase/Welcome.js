import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function Welcome({ match }) {
  const classes = useStyles();

  const currKinase = match.path.split('/')[2];

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
              <h4 className={classes.cardTitleWhite}>What is ChemPhoProlog?</h4>
            </CardHeader>
            <CardBody>
              <Typography variant='body1'>
                {' '}
                ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff.
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
              <Typography variant='body1'>{currKinase}</Typography>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
