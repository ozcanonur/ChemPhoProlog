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
  const [cy, setCy] = useState(Cytoscape());
  const [elementsToAnimate, setElementsToAnimate] = useState({
    elementsToShow: cy.collection(),
    elementsToFade: cy.collection(),
  });

  const dispatch = useDispatch();
  useEffect(() => {
    // Resize event listener
    let width = cy.width();
    let height = cy.height();
    cy.on('resize', (evt) => {
      const widthChange = Math.abs(evt.target.width() - width);
      const heightChange = Math.abs(evt.target.height() - height);

      // Need to run on first render because doesn't run layout without it
      const isFirstRender = widthChange === 0 && heightChange === 0;
      const sizeChanged = widthChange > 30 || heightChange > 30;

      if (isFirstRender || sizeChanged) runLayout(cy, layout);

      width = evt.target.width();
      height = evt.target.height();
    });

    // Set context menu
    if (cy.elements().length > 0) cy.cxtmenu(cxtmenuOptions(dispatch));

    // Cleanup
    return () => {
      cy.removeListener('on');
      clearAllTimeouts();
      hideTooltips();
    };
  }, [cy]);

  // Set currently animated elements
  useEffect(() => {
    setElementsToAnimate(getElementsToAnimate(cy, selectedPath));
  }, [selectedPath]);

  useEffect(() => {
    resetPathwayVisuals(cy);
    animatePath(elementsToAnimate, data, 50, true, true);
  }, [elementsToAnimate]);

  return (
    <div>
      <CytoscapeComponent
        cy={(cy) => {
          // Need this to get a reference to cy object in the component
          setCy(cy);
        }}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '800px' }}
        minZoom={0.5}
        maxZoom={1.2}
        boxSelectionEnabled
      />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ExtraButtons cy={cy} data={data} elementsToAnimate={elementsToAnimate} />
      </div>
    </div>
  );
};

export default Pathway;
