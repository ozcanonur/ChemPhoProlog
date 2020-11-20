/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import cxtmenu from 'cytoscape-cxtmenu';
import { hideAll as hideTooltips } from 'tippy.js';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { playToast, PathwayGeneratedToast } from 'components/Misc/Toast/toast';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import PathwayInputs from 'components/Pathways/Inputs/Inputs';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import { setElementsToAnimate, setCxtMenu } from 'actions/pathways';
import ExtraButtons from './Buttons/Buttons';
import PathInspectList from './PathInspectList';
import PathwayInformation from './Information/Information';
import { getCytoStylesheet, getCytoLayout, getCytoElements } from './utils/options';
import { runLayout, clearAllTimeouts, resetPathwayVisuals, fadeTooltipsOnScroll } from './utils/misc';
import cxtmenuOptions from './utils/cxtmenuOptions';

const useStyles = makeStyles({
  container: {
    padding: '2em',
  },
});

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);
Cytoscape.use(cxtmenu);

const PathwayIndex = () => {
  const classes = useStyles();

  const data = useSelector((state: RootState) => state.pathwayData);
  const [cy, setCy] = useState(Cytoscape());

  const store = useStore();
  const dispatch = useDispatch();

  const { pathwayInputs } = store.getState();
  const { cellLine, perturbagen, substrate } = pathwayInputs;

  const elements = getCytoElements(data, substrate);
  const stylesheet = getCytoStylesheet(data.observation, data.regulatory, substrate);
  const layout = getCytoLayout();

  // Listener to hide tooltips when the user scrolls way down
  // Normally they stick to the top of the screen
  useEffect(() => {
    const mainPanel = document.getElementById('mainPanel');
    if (mainPanel) mainPanel.addEventListener('scroll', fadeTooltipsOnScroll);

    return () => {
      if (mainPanel) mainPanel.removeEventListener('scroll', fadeTooltipsOnScroll);
    };
  }, []);

  // Toast
  useEffect(() => {
    if (elements.length > 0) {
      playToast(`PathwayGenerated_${cellLine}${perturbagen}${substrate}`, <PathwayGeneratedToast inputs={pathwayInputs} />, {
        autoClose: 10000,
      });
    }
  }, [data]);

  // Cleanup listener, timeouts, tooltips
  // And current selected animation
  // A.k.a removing everything that was 'animated' on unmount
  useEffect(() => {
    return () => {
      cy.removeListener('on');
      clearAllTimeouts();
      hideTooltips();
      dispatch(
        setElementsToAnimate({
          elementsToShow: cy.collection(),
          elementsToFade: cy.collection(),
        })
      );
    };
  }, []);

  // Reset animation/tooltips when new data for the graph comes in
  useEffect(() => {
    resetPathwayVisuals(cy);
  }, [data]);

  // Setting up cxtMenu, create new whenever new elements are generated
  useEffect(() => {
    if (cy.elements().length > 0) {
      const currCxtMenu = store.getState().cxtMenu;
      if (currCxtMenu) currCxtMenu.destroy();

      const newCxtMenuOptions = cxtmenuOptions(dispatch);
      // @ts-ignore
      dispatch(setCxtMenu(cy.cxtmenu(newCxtMenuOptions)));
    }
  }, [elements]);

  return (
    <div className={classes.container}>
      <GridContainer direction='column'>
        <GridItem style={{ position: 'relative' }}>
          <PathwayInputs cy={cy} />
        </GridItem>
        <GridItem style={{ display: 'flex', maxWidth: '100%' }}>
          <CardGeneric
            color='primary'
            cardTitle='Pathway'
            cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate} `}
            style={{ height: '50rem', position: 'relative' }}
          >
            <CytoscapeComponent
              cy={(_cy) => {
                // Need this to get a reference to cy object in the component
                // Also need to run layout here, doing on useEffect doesn't work
                setCy(_cy);
                runLayout(_cy, layout);
              }}
              elements={elements}
              stylesheet={stylesheet}
              style={{ height: '100%', width: '100%' }}
              minZoom={0.3}
              maxZoom={1.2}
              boxSelectionEnabled
              // @ts-ignore
              wheelSensitivity={0.1}
            />
            <ExtraButtons cy={cy} />
          </CardGeneric>
          <PathInspectList cy={cy} />
        </GridItem>
        <GridItem>
          <PathwayInformation />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default React.memo(PathwayIndex, () => true);
