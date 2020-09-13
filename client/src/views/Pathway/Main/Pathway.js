/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from 'store';
import setCy from 'actions/Pathway/setCy';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import cxtmenu from 'cytoscape-cxtmenu';
import { hideAll as hideTooltips } from 'tippy.js';

import CardGeneric from 'components/Card/CardGeneric';
import ExtraButtons from 'views/Pathway/Main/ExtraButtons';
import {
  runLayout,
  clearAllTimeouts,
  resetPathwayVisuals,
  addResizeEventListener,
} from 'views/Pathway/utils/misc';
import cxtmenuOptions from 'views/Pathway/utils/cxtmenuOptions';
import setCxtMenu from 'actions/Pathway/setCxtMenu';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);
Cytoscape.use(cxtmenu);

const Pathway = (props) => {
  const { data, elements, stylesheet, layout } = props;
  const cy = useSelector((state) => state.cy) || Cytoscape();
  const { cellLine, perturbagen, substrate } = store.getState().pathwayInputs;

  const dispatch = useDispatch();
  useEffect(() => {
    addResizeEventListener(cy, layout);
    // Cleanup
    return () => {
      cy.removeListener('on');

      // Have to do this timeout because it clashes with bg animation
      setTimeout(() => {
        clearAllTimeouts();
        hideTooltips();
      }, 100);
    };
  }, [cy]);

  useEffect(() => {
    resetPathwayVisuals(cy);
  }, [data]);

  useEffect(() => {
    if (cy.elements().length > 0) {
      const currCxtMenu = store.getState().cxtMenu;
      if (currCxtMenu) currCxtMenu.destroy();

      const newCxtMenuOptions = cxtmenuOptions(dispatch);
      dispatch(setCxtMenu(cy.cxtmenu(newCxtMenuOptions)));
    }
  }, [elements]);

  return (
    <CardGeneric
      color='primary'
      cardTitle='Pathway'
      cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate} `}
      style={{ height: '55rem' }}
    >
      <CytoscapeComponent
        cy={(_cy) => {
          // Need this to get a reference to cy object in the component
          if (_cy !== cy) {
            dispatch(setCy(_cy));
          }
          runLayout(_cy, layout);
        }}
        autolock={false}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '100%' }}
        minZoom={0.3}
        maxZoom={1.2}
        boxSelectionEnabled
      />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ExtraButtons />
      </div>
    </CardGeneric>
  );
};

export default Pathway;
