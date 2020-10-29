import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Fade from '@material-ui/core/Fade';
import Button from 'components/Misc/CustomButton/Button';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import Legend from 'views/Pathway/Main/Buttons/Legend';

import { toggleTooltips } from 'views/Pathway/utils/tooltip';
import { animatePath } from 'views/Pathway/utils/animation';
import {
  resetPathwayVisuals,
  clearAllTimeouts,
} from 'views/Pathway/utils/misc';

import { changeSelectedPath } from 'actions/pathways';

const ExtraButtons = () => {
  const cy = useSelector((state) => state.cy);
  const data = useSelector((state) => state.pathwayData) || {
    paths: [],
    relations: {},
    phosphosites: [],
    regulatory: {},
    stoppingReasons: {},
    observation: {},
  };

  const elementsToAnimate = useSelector((state) => state.elementsToAnimate);

  const [legendOpen, setLegendOpen] = useState(false);
  const [faded, setFaded] = useState(false);
  const [tooltipsOpen, setTooltipsOpen] = useState(false);
  const [phosphositesOpen, setPhosphositesOpen] = useState(false);

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
        elementsToAnimate.elementsToFade.toggleClass('fade');
        setFaded(!faded);
      },
      state: faded,
      disabled: !elementsToAnimate.elementsToShow.length,
    },
    {
      text: 'Tooltips',
      onClick: () => {
        toggleTooltips(data, elementsToAnimate);
        setTooltipsOpen(!tooltipsOpen);
      },
      state: tooltipsOpen,
      disabled: !elementsToAnimate.elementsToShow.length,
    },
    {
      text: 'Phosphosites',
      onClick: () => {
        clearAllTimeouts();
        resetPathwayVisuals(cy);
        if (phosphositesOpen) dispatch(changeSelectedPath([]));
        else
          animatePath(
            { elementsToShow: cy.elements(), elementsToFade: cy.collection() },
            data,
            0,
            false,
            false
          );
        setPhosphositesOpen(!phosphositesOpen);
      },
      state: phosphositesOpen,
      disabled: !data.paths.length,
    },
    {
      text: 'Export',
      onClick: async () => {
        const png64 = await cy.png({
          output: 'blob-promise',
          full: true,
          scale: 2,
        });
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
        {buttonList.map(({ text, onClick, state, disabled }, key) => (
          <GridItem key={key}>
            <Button
              onClick={onClick}
              disabled={disabled}
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
