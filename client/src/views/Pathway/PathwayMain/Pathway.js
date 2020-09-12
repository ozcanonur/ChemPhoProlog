/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from 'store';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import cxtmenu from 'cytoscape-cxtmenu';
import { hideAll as hideTooltips } from 'tippy.js';

import CardGeneric from 'components/Card/CardGeneric';
import ExtraButtons from 'views/Pathway/PathwayMain/ExtraButtons';
import { getElementsToAnimate, animatePath } from 'views/Pathway/CytoscapeUtils/animation';
import { runLayout, clearAllTimeouts, resetPathwayVisuals } from 'views/Pathway/CytoscapeUtils/misc';
import cxtmenuOptions from 'views/Pathway/CytoscapeUtils/cxtmenuOptions';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);
Cytoscape.use(cxtmenu);

let cxtMenu;
let cy = Cytoscape();

const Pathway = ({ data, elements, stylesheet, layout }) => {
  const selectedPath = useSelector((state) => state.selectedPath);

  const [elementsToAnimate, setElementsToAnimate] = useState({
    elementsToShow: cy.collection(),
    elementsToFade: cy.collection(),
  });

  const [cyLocked, setCyLocked] = useState(false);
  const changeLock = () => {
    setCyLocked(!cyLocked);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // Resize event listener
    let width = cy.width();
    let height = cy.height();
    cy.on('resize', (evt) => {
      const widthChange = Math.abs(evt.target.width() - width);
      const heightChange = Math.abs(evt.target.height() - height);

      // Only run layout again when resize is more than 30px
      const sizeChanged = widthChange > 30 || heightChange > 30;
      if (sizeChanged) runLayout(cy, layout);

      width = evt.target.width();
      height = evt.target.height();
    });

    // Cleanup
    return () => {
      cy.removeListener('on');
      clearAllTimeouts();
      hideTooltips();
    };
  }, [cy]);

  // Set currently animated elements
  useEffect(() => {
    const elementsToAnimate = getElementsToAnimate(cy, selectedPath);
    setElementsToAnimate(elementsToAnimate);

    resetPathwayVisuals(cy);
    animatePath(elementsToAnimate, data, 50, true, true);
  }, [selectedPath]);

  useEffect(() => {
    resetPathwayVisuals(cy);
  }, [data]);

  useEffect(() => {
    if (cy.elements().length > 0) {
      runLayout(cy, layout);
      if (cxtMenu) cxtMenu.destroy();
      cxtMenu = cy.cxtmenu(cxtmenuOptions(dispatch));
    }
  }, [elements]);

  const { cellLine, perturbagen, substrate } = store.getState().pathwayInputs;

  return (
    <CardGeneric
      color='primary'
      cardTitle='Pathway'
      cardSubtitle={`${cellLine} / ${perturbagen} / ${substrate} `}
    >
      <CytoscapeComponent
        cy={(_cy) => {
          // Need this to get a reference to cy object in the component
          cy = _cy;
        }}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '1000px' }}
        minZoom={0.5}
        maxZoom={1.2}
        autolock={cyLocked}
        boxSelectionEnabled
      />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ExtraButtons
          cy={cy}
          data={data}
          elementsToAnimate={elementsToAnimate}
          lock={{ cyLocked, changeLock }}
        />
      </div>
    </CardGeneric>
  );
};

export default Pathway;
