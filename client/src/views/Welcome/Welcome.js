import React from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardIcon from 'components/Card/CardIcon';
import Typography from '@material-ui/core/Typography';
import NewReleases from '@material-ui/icons/NewReleases';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Lottie from 'react-lottie';
import animationData from 'assets/lottie/DNA.json';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const NewFindings = ({ direction, cardTitle, cardCategory }) => {
  const classes = useStyles();

  return (
    <GridContainer direction='column' style={{ flexWrap: 'inherit', flexDirection: direction }}>
      <GridItem>
        <Card>
          <CardHeader color='primary' stats icon>
            <CardIcon color='primary'>
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
              The diverse and highly complex nature of modern phosphoproteomics research produces a
              high volume of data. Chemical phosphoproteomics especially, is amenable to a variety
              of analytical approaches. In this study we propose novel logic-based algorithms that
              overcome the limitations of existing tools used for analysis of these types of
              datasets. Initially we developed a first order deductive, logic-based model and
              populated it with a scoring system, with which we were able to expand from it
            </Typography>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const Welcome = () => {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const navigationTexts = [
    'The diverse and highly complex nature of modern phosphoproteomics research produces a',
    ' High volume of data. Chemical phosphoproteomics especially, is amenable to a variety',
    'Of analytical approaches. In this study we propose novel logic-based algorithms that',
    'The diverse and highly complex nature of modern phosphoproteomics research produces a',
    ' High volume of data. Chemical phosphoproteomics especially, is amenable to a variety',
    'Of analytical approaches. In this study we propose novel logic-based algorithms that',
  ];

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
              initially Boolean nature. This allowed us to identify previously unreported
              inhibitor-kinase relationships which could offer novel therapeutic targets for further
              investigation. We also present the model and its findings in a human readable and
              explanation-integrated manner. This offers an open-source model blueprint to act as a
              resource for its application in more and diverse data sets.
            </Typography>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <GridContainer direction='row'>
          <GridItem md>
            <NewFindings
              direction={'column'}
              cardTitle={'540 Perturbagen - Kinase'}
              cardCategory={'New Interactions'}
            />
          </GridItem>
          <GridItem md>
            <div
              style={{
                background: 'rgb(0,0,0,0.8)',
                marginTop: '32px',
              }}>
              <Lottie options={defaultOptions} height={377} width={500} />
            </div>
          </GridItem>
          <GridItem md>
            <NewFindings
              direction={'column-reverse'}
              cardTitle={'20458 PDTs'}
              cardCategory={'New Downstream Targets'}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader color='warning'>
            <h4 className={classes.cardTitleWhite}>How to navigate?</h4>
          </CardHeader>
          <CardBody>
            <List>
              {navigationTexts.map((e, key) => (
                <ListItem key={key}>
                  <ListItemIcon>
                    <KeyboardArrowRight />
                  </ListItemIcon>
                  <ListItemText primary={e} />
                </ListItem>
              ))}
            </List>
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
