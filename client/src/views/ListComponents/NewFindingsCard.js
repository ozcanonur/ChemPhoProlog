import React from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter';
import Danger from 'components/Typography/Danger';

import Warning from '@material-ui/icons/Warning';
import NewReleases from '@material-ui/icons/NewReleases';
import TrendingDown from '@material-ui/icons/TrendingDown';

import PieChart from 'views/ListComponents/PieChart';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const NewFindingsCard = ({ leftIconTitle, leftIconText, rightIconTitle, rightIconText }) => {
  const classes = useStyles();

  const dataNewPerturbagens = [
    {
      id: 'New',
      label: 'New',
      value: 6,
    },
    {
      id: 'Known',
      label: 'Known',
      value: 24,
    },
  ];

  const dataNewSubstrates = [
    {
      id: 'New',
      label: 'New',
      value: 24,
    },
    {
      id: 'Known',
      label: 'Known',
      value: 14,
    },
  ];

  const colorsNew = ['rgba(255,193,7, 0.7)', 'rgba(45,65,89, 0.7)'];

  return (
    <GridContainer direction='column'>
      <GridItem md>
        <GridContainer direction='row' justify='space-evenly'>
          <GridItem md>
            <Card>
              <CardHeader color='warning' stats icon>
                <CardIcon color='warning'>
                  <NewReleases />
                </CardIcon>
                <p className={classes.cardCategory}>{leftIconTitle}</p>
                <h3 className={classes.cardTitle}>{leftIconText}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  Previously reported direct targets: 24
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem md>
            <div style={{ height: '150px' }}>
              <PieChart data={dataNewPerturbagens} colors={colorsNew} />
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem md>
        <GridContainer direction='row' justify='space-evenly'>
          <GridItem md>
            <Card>
              <CardHeader color='warning' stats icon>
                <CardIcon color='warning'>
                  <TrendingDown />
                </CardIcon>
                <p className={classes.cardCategory}>{rightIconTitle}</p>
                <h3 className={classes.cardTitle}>{rightIconText}</h3>
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
          <GridItem md>
            <div style={{ height: '150px' }}>
              <PieChart data={dataNewSubstrates} colors={colorsNew} />
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default NewFindingsCard;
