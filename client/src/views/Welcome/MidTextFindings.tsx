import React from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Typography from '@material-ui/core/Typography';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardIcon from 'components/Card/CardIcon';
import NewReleases from '@material-ui/icons/NewReleases';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const NewFindings = ({ direction, cardTitle, cardCategory }) => {
  const classes = useStyles();

  return (
    <GridContainer direction='column' style={{ flexWrap: 'inherit', flexDirection: direction }}>
      <GridItem>
        <Card>
          <CardHeader color='warning' stats icon>
            <CardIcon color='warning'>
              <NewReleases />
            </CardIcon>
            <p className={classes.cardCategory}>{cardCategory}</p>
            <h3 className={classes.cardTitle}>{cardTitle}</h3>
          </CardHeader>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardBody>
            <Typography variant='body1'>
              The diverse and highly complex nature of modern phosphoproteomics research produces a high
              volume of data. Chemical phosphoproteomics especially, is amenable to a variety of analytical
              approaches. In this study we propose novel logic-based algorithms that overcome the limitations
              of existing tools used for analysis of these types of datasets. Initially we developed a first
              order deductive, logic-based model and populated it with a scoring system, with which we were
              able to expand from it
            </Typography>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const MidTextFindings = () => {
  return (
    <GridContainer direction='row'>
      <GridItem md>
        <NewFindings
          direction='column'
          cardTitle='540 Perturbagen - Kinase'
          cardCategory='New Interactions'
        />
      </GridItem>
      <GridItem md>
        <NewFindings
          direction='column-reverse'
          cardTitle='20458 PDTs'
          cardCategory='New Downstream Targets'
        />
      </GridItem>
    </GridContainer>
  );
};

export default MidTextFindings;
