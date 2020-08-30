/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import cxtmenu from 'cytoscape-cxtmenu';
import { hideAll as hideTooltips } from 'tippy.js';

import ExtraButtons from 'views/Pathway/ExtraButtons';
import { getElementsToAnimate, animatePath } from 'views/Pathway/CytoscapeUtils/animation';
import { runLayout, clearAllTimeouts, resetPathwayVisuals } from 'views/Pathway/CytoscapeUtils/misc';
import cxtmenuOptions from 'views/Pathway/CytoscapeUtils/cxtmenuOptions';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);
Cytoscape.use(cxtmenu);

const Pathway = ({ data, stylesheet, layout, elements, selectedPath }) => {
  let cy = Cytoscape();

  const [elementsToAnimate, setElementsToAnimate] = useState({
    elementsToShow: cy.collection(),
    elementsToFade: cy.collection(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // Resize event listener
    cy.on('resize', () => {
      runLayout(cy, layout);
    });

    // Set context menu
    cy.cxtmenu(cxtmenuOptions(dispatch));

    return () => {
      clearAllTimeouts();
      hideTooltips();
    };
  }, []);

  // Set currently animated elements
  useEffect(() => {
    setElementsToAnimate(getElementsToAnimate(cy, selectedPath));
  }, [selectedPath]);

  useEffect(() => {
    resetPathwayVisuals(cy);
    animatePath(elementsToAnimate, data, 50);
  });

  return (
    <div>
      <CytoscapeComponent
        cy={(cyCore) => {
          // Need this to get a reference to cy object in the component
          cy = cyCore;
        }}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '800px' }}
        minZoom={0.5}
        maxZoom={1.2}
        boxSelectionEnabled
      />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ExtraButtons data={data} elementsToAnimate={elementsToAnimate} />
      </div>
    </div>
  );
};

export default Pathway;
