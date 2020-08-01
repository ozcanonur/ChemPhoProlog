import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter.js';
import Danger from 'components/Typography/Danger.js';
import Warning from '@material-ui/icons/Warning';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const useStyles = makeStyles(styles);

const NewFindingsCard = ({
  leftIconTitle,
  leftIconText,
  rightIconTitle,
  rightIconText,
}) => {
  const classes = useStyles();

  const [leftIconHovered, setLeftIconHovered] = useState(false);
  const [rightIconHovered, setRightIconHovered] = useState(false);

  return (
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
                <ArrowForwardIcon
                  style={{
                    pointerEvents: `${leftIconHovered ? 'none' : 'inherit'}`,
                  }}
                />
              ) : (
                <NewReleasesIcon />
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
        <Card>
          <CardHeader color='primary' stats icon>
            <CardIcon
              color='primary'
              onMouseOver={() => setRightIconHovered(true)}
              onMouseOut={() => setRightIconHovered(false)}
              style={{
                transform: `${rightIconHovered ? 'scale(1.2,1.2)' : 'scale(1,1)'}`,
                cursor: 'pointer',
              }}
            >
              {rightIconHovered ? (
                <ArrowForwardIcon
                  style={{
                    pointerEvents: `${rightIconHovered ? 'none' : 'inherit'}`,
                  }}
                />
              ) : (
                <TrendingDownIcon />
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
    </GridContainer>
  );
};

export default NewFindingsCard;
