import React from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import FlipCard from 'components/FlipCard/FlipCard';
import TopText from 'views/Welcome/TopText';
import MidTextFindings from 'views/Welcome/MidTextFindings';
import HowToNavigate from 'views/Welcome/HowToNavigate';
import BezzLab from 'views/Welcome/BezzLab';

import flipCardContents from 'views/Welcome/flipCardContents';

const Welcome = (): JSX.Element => {
  const [
    pathwayCard1,
    pathwayCard2,
    browseCard1,
    browseCard2,
    detailsCard1,
    detailsCard2,
  ] = flipCardContents;

  return (
    <GridContainer direction='column' style={{ padding: '2em' }}>
      <GridItem>
        <TopText />
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
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
      <GridItem style={{ marginTop: '2rem' }}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={browseCard1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={browseCard2} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
        <HowToNavigate />
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={detailsCard1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={detailsCard2} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
        <BezzLab />
      </GridItem>
    </GridContainer>
  );
};

export default Welcome;
