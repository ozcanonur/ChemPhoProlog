import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';

import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import { runLayout } from 'views/Pathway/utils/misc';
import { getCyElementsFromSelectedPath, animatePath } from 'views/Pathway/utils/animation';

import { hideAll as hideTooltips } from 'tippy.js';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);

const Pathway = ({ pathwayData, stylesheet, layout, elements, selectedPath }) => {
  const [cy, setCy] = useState(Cytoscape());
  const [animateElements, setAnimateElements] = useState({
    animate: cy.collection(),
    fade: cy.collection(),
  });

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
    e.removeClass('highlightedKPa');
    e.removeClass('highlightedPhosphosite');
    e.removeClass('highlightedKinaseEdge');
    e.removeClass('highlightedPhosphataseEdge');
  });

  // Run layout
  runLayout(cy, layout);

  // Fade nodes outside the animation
  if (animateElements.animate.length !== 0) animateElements.fade.addClass('fade');
  // Animate
  animatePath(
    animateElements.animate,
    {
      regulatory: pathwayData.regulatory,
      stoppingReasons: pathwayData.stoppingReasons,
      observation: pathwayData.observation,
    },
    200
  );

  return (
    <div style={{ position: 'relative' }}>
      <CytoscapeComponent
        cy={(cy) => setCy(cy)}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '800px' }}
      />
      <GridContainer direction='column' style={{ position: 'absolute', bottom: 0 }}>
        <GridItem md>
          <Button onClick={() => toggleFade()} color={'warning'} style={{ width: '100%' }}>
            Toggle Nodes
          </Button>
        </GridItem>
        <GridItem md>
          <Button
            onClick={() => {
              toggleTooltips();
            }}
            color={'warning'}
            style={{ width: '100%' }}>
            Toggle Tooltips
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Pathway;
