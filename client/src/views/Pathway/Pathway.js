import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';

import ExtraButtons from 'views/Pathway/ExtraButtons';

import { animatePath } from 'views/Pathway/CytoscapeUtils/animation';

import { hideAll as hideTooltips } from 'tippy.js';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);

const getElementsToAnimate = (cy, selectedPath) => {
  let pathwayIds = [];
  selectedPath.forEach((node, index) => {
    if (index % 2 !== 0 || index === selectedPath.length - 1) {
      pathwayIds.push(`${node}to${selectedPath[index - 1]}`);
      pathwayIds.push(node);
    } else pathwayIds.push(node);
  });

  let animate = cy.elements().filter((e) => pathwayIds.includes(e.data().id));
  // Sort the animate list according to the pathway ID list (for sequential animation)
  animate = animate.sort(
    (x, y) => pathwayIds.indexOf(x.data().id) - pathwayIds.indexOf(y.data().id)
  );
  let fade = cy.elements().filter((e) => !pathwayIds.includes(e.data().id));
  // Do not include the starting KPa in fade list (because looks better)
  fade = fade.filter((e) => e.data().id !== animate[0].data().parent);

  return { animate, fade };
};

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
    setAnimateElements(getElementsToAnimate(cy, selectedPath));
  }, [selectedPath]);

  // Run every render
  useEffect(() => {
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

    // Resize event listener
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
  });

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
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ExtraButtons
          cy={cy}
          runLayout={runLayout}
          toggleFade={toggleFade}
          toggleTooltips={toggleTooltips}
        />
      </div>
    </div>
  );
};

export default Pathway;
