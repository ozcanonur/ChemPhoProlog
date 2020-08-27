import React, { useState } from 'react';

import Fade from '@material-ui/core/Fade';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Legend from 'views/Pathway/Legend/';

const ExtraButtons = ({ runLayout, toggleFade, toggleTooltips }) => {
  const [legendOpen, setLegendOpen] = useState(false);

  const buttonList = [
    {
      text: 'Legend',
      onClick: () => setLegendOpen(!legendOpen),
    },
    {
      text: 'Layout',
      onClick: () => runLayout(),
    },
    {
      text: 'Fade',
      onClick: () => toggleFade(),
    },
    {
      text: 'Tooltips',
      onClick: () => toggleTooltips(),
    },
  ];

  return (
    <GridContainer direction='column'>
      {buttonList.map(({ text, onClick }, key) => (
        <GridItem key={key}>
          <Button onClick={onClick} color='warning' style={{ width: '100px' }}>
            {text}
          </Button>
        </GridItem>
      ))}
      <Fade in={legendOpen}>
        <div
          style={{
            position: 'absolute',
            top: 5,
            right: 130,
            pointerEvents: 'none',
            padding: '10px',
          }}
        >
          <Legend />
        </div>
      </Fade>
    </GridContainer>
  );
};

export default ExtraButtons;
