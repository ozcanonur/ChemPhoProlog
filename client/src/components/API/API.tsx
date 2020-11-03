import React from 'react';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import typography from '../../variables/apiTexts';
import APICard from './APICard';

const API = () => {
  const [pathway, observation, phosphosites, knownSubstrates, PDTs, knownPerturbagens, knownTargets] = typography;

  return (
    <div style={{ padding: '2rem' }}>
      <GridContainer direction='column'>
        <GridItem>
          <APICard content={pathway} />
        </GridItem>
        <GridItem>
          <GridContainer direction='row'>
            <GridItem md>
              <APICard content={observation} />
            </GridItem>
            <GridItem md>
              <APICard content={phosphosites} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction='row'>
            <GridItem md>
              <APICard content={knownSubstrates} />
            </GridItem>
            <GridItem md>
              <APICard content={PDTs} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction='row'>
            <GridItem md>
              <APICard content={knownPerturbagens} />
            </GridItem>
            <GridItem md>
              <APICard content={knownTargets} />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default API;
