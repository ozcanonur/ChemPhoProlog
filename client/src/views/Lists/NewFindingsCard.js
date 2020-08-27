import React, { useState } from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter';
import Danger from 'components/Typography/Danger';

import ArrowForward from '@material-ui/icons/ArrowForward';
import Warning from '@material-ui/icons/Warning';
import NewReleases from '@material-ui/icons/NewReleases';
import TrendingDown from '@material-ui/icons/TrendingDown';

import PieChart from 'views/Lists/PieChart';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

const NewFindingsCard = ({ leftIconTitle, leftIconText, rightIconTitle, rightIconText }) => {
  const classes = useStyles();

  const [leftIconHovered, setLeftIconHovered] = useState(false);
  const [rightIconHovered, setRightIconHovered] = useState(false);

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
  const colorsNewPerturbagens = ['rgba(156, 39, 176, 0.84)', 'rgba(156, 39, 176, 0.32)'];

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

  const colorsNewSubstrates = ['rgba(0, 172, 193, 0.84)', 'rgba(0, 172, 193, 0.32)'];

  return (
    <GridContainer direction='column'>
      <GridItem md>
        <GridContainer direction='row' justify='space-evenly'>
          <GridItem md>
            <Card>
              <CardHeader color='primary' stats icon>
                <CardIcon
                  color='primary'
                  onMouseOver={() => setLeftIconHovered(true)}
                  onMouseOut={() => setLeftIconHovered(false)}
                  style={{
                    transform: `${leftIconHovered ? 'scale(1.2,1.2)' : 'scale(1,1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  {leftIconHovered ? (
                    <ArrowForward
                      style={{
                        pointerEvents: `${leftIconHovered ? 'none' : 'inherit'}`,
                      }}
                    />
                  ) : (
                    <NewReleases />
                  )}
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
              <PieChart data={dataNewPerturbagens} colors={colorsNewPerturbagens} />
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem md>
        <GridContainer direction='row' justify='space-evenly'>
          <GridItem md>
            <Card>
              <CardHeader color='primary' stats icon>
                <CardIcon
                  color='info'
                  onMouseOver={() => setRightIconHovered(true)}
                  onMouseOut={() => setRightIconHovered(false)}
                  style={{
                    transform: `${rightIconHovered ? 'scale(1.2,1.2)' : 'scale(1,1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  {rightIconHovered ? (
                    <ArrowForward
                      style={{
                        pointerEvents: `${rightIconHovered ? 'none' : 'inherit'}`,
                      }}
                    />
                  ) : (
                    <TrendingDown />
                  )}
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
              <PieChart data={dataNewSubstrates} colors={colorsNewSubstrates} />
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default NewFindingsCard;
