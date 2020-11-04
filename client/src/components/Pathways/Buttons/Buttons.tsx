/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Fade from '@material-ui/core/Fade';
import Button from 'components/Misc/CustomButton/Button';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import Legend from 'components/Pathways/Buttons/Legend/Legend';

import { toggleTooltips } from 'components/Pathways/utils/tooltip';
import { animatePath } from 'components/Pathways/utils/animation';
import { resetPathwayVisuals, clearAllTimeouts } from 'components/Pathways/utils/misc';

import { changeSelectedPath } from 'actions/pathways';
import { Core } from 'cytoscape';
import buttonsStyles from './style';

const useStyles = makeStyles(buttonsStyles);

interface Props {
  cy: Core;
}

const ExtraButtons = ({ cy }: Props) => {
  const classes = useStyles();

  const data = useSelector((state: RootState) => state.pathwayData);

  const elementsToAnimate = useSelector((state: RootState) => state.elementsToAnimate);

  const [legendOpen, setLegendOpen] = useState(false);
  const [faded, setFaded] = useState(false);
  const [tooltipsOpen, setTooltipsOpen] = useState(false);
  const [phosphositesOpen, setPhosphositesOpen] = useState(false);

  useEffect(() => {
    setFaded(false);
    setTooltipsOpen(false);
    setPhosphositesOpen(false);
  }, [data, elementsToAnimate]);

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
        if (!cy) return;
        clearAllTimeouts();
        resetPathwayVisuals(cy);
        if (phosphositesOpen) dispatch(changeSelectedPath([]));
        else animatePath({ elementsToShow: cy.elements(), elementsToFade: cy.collection() }, data, 0, false, false);
        setPhosphositesOpen(!phosphositesOpen);
      },
      state: phosphositesOpen,
      disabled: !data.paths.length,
    },
    {
      text: 'Export',
      onClick: async () => {
        if (!cy) return;
        const png64 = await cy.png({
          // @ts-ignore
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
    <div className={classes.container}>
      <GridContainer direction='column'>
        {buttonList.map(({ text, onClick, state, disabled }, key) => (
          <GridItem key={key}>
            <Button
              onClick={onClick}
              disabled={disabled}
              className={classes.button}
              style={{
                borderLeft: state && text === 'Legend' ? '5px solid #e5ad06' : 'inherit',
              }}
            >
              {text}
            </Button>
          </GridItem>
        ))}
        <Fade in={legendOpen}>
          <div className={classes.legendContainer}>
            <Legend />
          </div>
        </Fade>
      </GridContainer>
    </div>
  );
};

export default ExtraButtons;
