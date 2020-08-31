import React, { useState } from 'react';

import Fade from '@material-ui/core/Fade';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Legend from 'views/Pathway/Legend/';

import { toggleTooltips } from 'views/Pathway/CytoscapeUtils/tooltip';
import { animatePath } from 'views/Pathway/CytoscapeUtils/animation';
import { resetPathwayVisuals } from 'views/Pathway/CytoscapeUtils/misc';

const ExtraButtons = ({ cy, data, elementsToAnimate }) => {
  const [legendOpen, setLegendOpen] = useState(false);
  const [phosphositesOpen, setPhosphositesOpen] = useState(false);

  const { elementsToFade } = elementsToAnimate;

  const buttonList = [
    {
      text: 'Legend',
      onClick: () => setLegendOpen(!legendOpen),
    },
    {
      text: 'Fade',
      onClick: () => elementsToFade.toggleClass('fade'),
    },
    {
      text: 'Tooltips',
      onClick: () => toggleTooltips(data, elementsToAnimate),
    },
    {
      text: 'Phosphosites',
      onClick: () => {
        if (phosphositesOpen) resetPathwayVisuals(cy);
        else {
          resetPathwayVisuals(cy);
          animatePath({ elementsToShow: cy.elements(), elementsToFade: cy.collection() }, data, 0, false);
        }
        setPhosphositesOpen(!phosphositesOpen);
      },
    },
  ];

  return (
    <div style={{ padding: '1em' }}>
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
              top: 10,
              right: 130,
              pointerEvents: 'none',
              padding: '10px',
            }}
          >
            <Legend />
          </div>
        </Fade>
      </GridContainer>
    </div>
  );
};

export default ExtraButtons;
