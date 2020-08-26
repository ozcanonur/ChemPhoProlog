import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';

import ExtraOptions from 'views/Pathway/ExtraOptions';

import { getCyElementsFromSelectedPath, animatePath } from 'views/Pathway/CytoscapeUtils/animation';

import { hideAll as hideTooltips } from 'tippy.js';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);

const Pathway = ({ pathwayData, stylesheet, layout, elements, selectedPath }) => {
  const [cy, setCy] = useState(Cytoscape());
  const [animateElements, setAnimateElements] = useState({
    animate: cy.collection(),
    fade: cy.collection(),
  });

  const runLayout = () => {
    cy.layout(layout).run();
    cy.fit();
  };

  const clearAllTimeouts = () => {
    for (var i = 0; i < 100000; i++) clearTimeout(i);
  };

  const toggleFade = () => {
    animateElements.fade.toggleClass('fade');
  };

  const toggleTooltips = () => {
    clearAllTimeouts();
    if (document.getElementsByClassName('tippy-popper').length !== 0) hideTooltips();
    else {
      animatePath(
        animateElements.animate,
        {
          regulatory: pathwayData.regulatory,
          stoppingReasons: pathwayData.stoppingReasons,
          observation: pathwayData.observation,
        },
        0
      );
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup animation timeouts
      clearAllTimeouts();
      // Clear tooltips
      hideTooltips();
    };
  }, []);

  // Set currently animated elements
  useEffect(() => {
    const { animate, fade } = getCyElementsFromSelectedPath(cy, selectedPath);
    setAnimateElements({ animate, fade });
  }, [selectedPath]);

  // Remove the previous highlighting/tooltips if any
  hideTooltips();
  clearAllTimeouts();
  cy.elements().forEach((e) => {
    e.removeClass('highlightedKPaInhibited');
    e.removeClass('highlightedKPaActivated');
    e.removeClass('highlightedKPaConflicting');
    e.removeClass('highlightedPhosphosite');
    e.removeClass('highlightedKinaseEdge');
    e.removeClass('highlightedPhosphataseEdge');
    e.removeClass('fade');
  });

  // Run layout on resize
  cy.on('resize', (_evt) => {
    runLayout();
  });

  // Fade nodes outside the animation
  animateElements.fade.addClass('fade');
  animatePath(
    animateElements.animate,
    {
      regulatory: pathwayData.regulatory,
      stoppingReasons: pathwayData.stoppingReasons,
      observation: pathwayData.observation,
    },
    100
  );

  return (
    <div style={{ position: 'relative' }}>
      <CytoscapeComponent
        cy={(cy) => {
          setCy(cy);
        }}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '800px' }}
      />
      <ExtraOptions
        cy={cy}
        runLayout={runLayout}
        toggleFade={toggleFade}
        toggleTooltips={toggleTooltips}
      />
    </div>
  );
};

export default Pathway;
