import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Fade from '@material-ui/core/Fade';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Legend from 'views/Pathway/Legend/';

import { toggleTooltips } from 'views/Pathway/CytoscapeUtils/tooltip';
import { animatePath } from 'views/Pathway/CytoscapeUtils/animation';
import { resetPathwayVisuals } from 'views/Pathway/CytoscapeUtils/misc';

import changeSelectedPath from 'actions/Pathway/changeSelectedPath';

const ExtraButtons = ({ cy, data, elementsToAnimate }) => {
  const [legendOpen, setLegendOpen] = useState(false);
  const [faded, setFaded] = useState(false);
  const [tooltipsOpen, setTooltipsOpen] = useState(false);
  const [phosphositesOpen, setPhosphositesOpen] = useState(false);

  const { elementsToFade } = elementsToAnimate;

  const dispatch = useDispatch();
  const buttonList = [
    {
      text: 'Legend',
      onClick: () => setLegendOpen(!legendOpen),
      state: legendOpen,
    },
    {
      text: 'Fade',
      onClick: () => {
        elementsToFade.toggleClass('fade');
        setFaded(!faded);
      },
      state: faded,
    },
    {
      text: 'Tooltips',
      onClick: () => {
        toggleTooltips(data, elementsToAnimate);
        setTooltipsOpen(!tooltipsOpen);
      },
      state: tooltipsOpen,
    },
    {
      text: 'Phosphosites',
      onClick: () => {
        resetPathwayVisuals(cy);
        if (phosphositesOpen) dispatch(changeSelectedPath([]));
        else animatePath({ elementsToShow: cy.elements(), elementsToFade: cy.collection() }, data, 0, false, false);

        setPhosphositesOpen(!phosphositesOpen);
      },
      state: phosphositesOpen,
    },
    {
      text: 'Export',
      onClick: async () => {
        const png64 = await cy.png({ output: 'blob-promise', full: true, scale: 2 });
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = URL.createObjectURL(new Blob([png64], { type: 'image/png' }));
        a.download = 'pathway.png';
        a.click();
      },
    },
  ];

  return (
    <div style={{ padding: '1em' }}>
      <GridContainer direction='column'>
        {buttonList.map(({ text, onClick, state }, key) => (
          <GridItem key={key}>
            <Button
              onClick={onClick}
              style={{
                width: '100px',
                backgroundColor: 'rgba(45,65,89, 0.7)',
                borderLeft: state ? '5px solid #e5ad06' : 'inherit',
              }}
            >
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
