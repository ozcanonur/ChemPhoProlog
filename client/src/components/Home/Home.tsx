import React from 'react';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import FlipCard from 'components/Misc/FlipCard/FlipCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

import flipCardContents from 'variables/flipCardContents';
import TopText from './TopText';
import MidTextFindings from './MidTextFindings';
import HowToNavigate from './HowToNavigate';
import BezzLab from './BezzLab';

const useStyles = makeStyles({
  container: {
    padding: '2em',
  },
  gridItem: {
    marginTop: '2rem',
  },
});

const Welcome = () => {
  const classes = useStyles();

  const [pathwayCard1, pathwayCard2, browseCard1, browseCard2, detailsCard1, detailsCard2] = flipCardContents;

  return (
    <GridContainer direction='column' className={classes.container}>
      <GridItem>
        <TopText />
      </GridItem>
      <GridItem className={classes.gridItem}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={pathwayCard1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={pathwayCard2} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <MidTextFindings />
      </GridItem>
      <GridItem className={classes.gridItem}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={browseCard1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={browseCard2} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem className={classes.gridItem}>
        <HowToNavigate />
      </GridItem>
      <GridItem className={classes.gridItem}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={detailsCard1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={detailsCard2} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem className={classes.gridItem}>
        <BezzLab />
      </GridItem>
    </GridContainer>
  );
};

export default Welcome;
