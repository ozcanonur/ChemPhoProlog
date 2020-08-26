import React, { useState } from 'react';

import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Legend from 'views/Pathway/Legend/index.js';

const ExtraOptions = ({ runLayout, toggleFade, toggleTooltips }) => {
  const [legendOpen, setLegendOpen] = useState(false);

  return (
    <GridContainer direction='column' style={{ position: 'absolute', top: 0, right: 0 }}>
      <GridItem>
        <Button
          onClick={() => {
            setLegendOpen(!legendOpen);
          }}
          color={'warning'}
          style={{ width: '100px' }}>
          Legend
        </Button>
        {legendOpen ? (
          <div
            style={{
              position: 'absolute',
              top: 5,
              right: 130,
              background: 'rgba(190,190,190,0.1)',
              pointerEvents: 'none',
              padding: '10px',
            }}>
            <Legend />
          </div>
        ) : null}
      </GridItem>
      <GridItem>
        <Button
          onClick={() => {
            runLayout();
          }}
          color={'warning'}
          style={{ width: '100px' }}>
          Randomise
        </Button>
      </GridItem>
      <GridItem>
        <Button onClick={() => toggleFade()} color={'warning'} style={{ width: '100px' }}>
          Nodes
        </Button>
      </GridItem>
      <GridItem>
        <Button
          onClick={() => {
            toggleTooltips();
          }}
          color={'warning'}
          style={{ width: '100px' }}>
          Tooltips
        </Button>
      </GridItem>
    </GridContainer>
  );
};

export default ExtraOptions;
