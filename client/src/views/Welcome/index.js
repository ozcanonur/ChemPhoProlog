import React from 'react';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import FlipCard from 'components/FlipCard/FlipCard';
import TopText from 'views/Welcome/TopText';
import MidTextFindings from 'views/Welcome/MidTextFindings';
import HowToNavigate from 'views/Welcome/HowToNavigate';
import BezzLab from 'views/Welcome/BezzLab';

import flipCardContents from 'views/Welcome/flipCardContents';

const Welcome = () => {
  const [
    pathwayCard_1,
    pathwayCard_2,
    browseCard_1,
    browseCard_2,
    detailsCard_1,
    detailsCard_2,
  ] = flipCardContents;

  return (
    <GridContainer direction='column' style={{ padding: '2em' }}>
      <GridItem>
        <TopText />
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={pathwayCard_1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={pathwayCard_2} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <MidTextFindings />
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={browseCard_1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={browseCard_2} />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
        <HowToNavigate />
      </GridItem>
      <GridItem style={{ marginTop: '2rem' }}>
        <GridContainer direction='row'>
          <GridItem md>
            <FlipCard content={detailsCard_1} />
          </GridItem>
          <GridItem md>
            <FlipCard content={detailsCard_2} />
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
