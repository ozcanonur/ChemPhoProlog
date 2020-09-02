import React from 'react';

import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div>
      <GridContainer direction='column' justify='space-between' style={{ padding: '2em' }}>
        <GridItem>
          <Card>
            <CardHeader color='primary' style={{ marginTop: '2em' }}>
              <h4 className={classes.cardTitleWhite}>What is ChemPhoProlog?</h4>
            </CardHeader>
            <CardBody>
              <Typography variant='body1'>
                ChemPhoPro provides a compendium of results and related information obtained from chemical
                phosphoproteomics experiments. And some other stuff.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>How to navigate?</h4>
            </CardHeader>
            <CardBody>
              <Typography variant='body1'>Just do it.</Typography>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default AboutUs;
