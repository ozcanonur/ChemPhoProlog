/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import cxtmenu from 'cytoscape-cxtmenu';
import { hideAll as hideTooltips } from 'tippy.js';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import PathwayInputs from 'components/Pathways/Inputs/Inputs';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import { setElementsToAnimate, setCxtMenu } from 'actions/pathways';
import ExtraButtons from './Buttons/Buttons';
import PathSelectList from './PathSelectList';
import PathwayInformation from './Information/Information';
import { getCytoStylesheet, getCytoLayout, getCytoElements } from './utils/options';
import { runLayout, clearAllTimeouts, resetPathwayVisuals } from './utils/misc';
import cxtmenuOptions from './utils/cxtmenuOptions';
import { HelperPopupGetPathway } from './HelperPopups';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);
Cytoscape.use(cxtmenu);

toast.configure();
const PathwayIndex = () => {
  const data = useSelector((state: RootState) => state.pathwayData);
  const [cy, setCy] = useState(Cytoscape());

  const store = useStore();
  const dispatch = useDispatch();

  const { cellLine, perturbagen, substrate } = store.getState().pathwayInputs;

  const elements = getCytoElements(data, substrate);
  const stylesheet = getCytoStylesheet(data.observation, data.regulatory, substrate);
  const layout = getCytoLayout();

  useEffect(() => {
    if (elements.length > 0) {
      toast('Pathway generated, explore possible paths below in Paths Table', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        delay: 0,
        progress: undefined,
        transition: Slide,
      });
    }
  }, [elements]);

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

  // useEffect(() => {
  //   addResizeEventListener(cy, layout);
  // }, [cy]);

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
    <div style={{ padding: '2em' }}>
      <GridContainer direction='column'>
        <GridItem style={{ position: 'relative' }}>
          <PathwayInputs cy={cy} />
          <HelperPopupGetPathway />
        </GridItem>
        <GridItem>
          <GridContainer direction='row'>
            <GridItem xs={10}>
              <CardGeneric
                color='primary'
                cardTitle='Pathway'
                cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate} `}
                style={{ height: '55rem', position: 'relative' }}
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
                  style={{ height: '100%' }}
                  minZoom={0.3}
                  maxZoom={1.2}
                  boxSelectionEnabled
                  // @ts-ignore
                  wheelSensitivity={0.1}
                />
                <ExtraButtons cy={cy} />
              </CardGeneric>
            </GridItem>
            <GridItem xs={2}>
              <PathSelectList cy={cy} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <PathwayInformation />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default React.memo(PathwayIndex, () => true);
