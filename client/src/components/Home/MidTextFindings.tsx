import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import Typography from '@material-ui/core/Typography';
import Card from 'components/Misc/Card/Card';
import CardHeader from 'components/Misc/Card/CardHeader';
import CardBody from 'components/Misc/Card/CardBody';
import CardIcon from 'components/Misc/Card/CardIcon';
import NewReleases from '@material-ui/icons/NewReleases';

const useStyles = makeStyles({
  cardCategory: {
    color: '#999',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
  },
  cardTitle: {
    color: '#3C4858',
    marginTop: '0px',
    minHeight: 'auto',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
});

interface Props {
  direction: string;
  cardTitle: string;
  cardCategory: string;
}

const NewFindings = ({ direction, cardTitle, cardCategory }: Props) => {
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
              The diverse and highly complex nature of modern phosphoproteomics research produces a high volume of data. Chemical
              phosphoproteomics especially, is amenable to a variety of analytical approaches. In this study we propose novel
              logic-based algorithms that overcome the limitations of existing tools used for analysis of these types of datasets.
              Initially we developed a first order deductive, logic-based model and populated it with a scoring system, with which
              we were able to expand from it
            </Typography>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const MidTextFindings = (): JSX.Element => {
  return (
    <GridContainer direction='row'>
      <GridItem md>
        <NewFindings direction='column' cardTitle='540 Perturbagen - Kinase' cardCategory='New Interactions' />
      </GridItem>
      <GridItem md>
        <NewFindings direction='column-reverse' cardTitle='20458 PDTs' cardCategory='New Downstream Targets' />
      </GridItem>
    </GridContainer>
  );
};

export default MidTextFindings;
