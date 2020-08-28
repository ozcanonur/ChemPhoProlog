/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import { hideAll as hideTooltips } from 'tippy.js';

import ExtraButtons from 'views/Pathway/ExtraButtons';
import animatePath from 'views/Pathway/CytoscapeUtils/animation';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);

const getElementsToAnimate = (cy, selectedPath) => {
  const pathIds = [];
  selectedPath.forEach((node, index) => {
    if (index % 2 === 0) {
      pathIds.push(node);
    } else {
      pathIds.push(`${node}to${selectedPath[index - 1]}`);
      pathIds.push(node);
    }
  });

  // if (pathIds.length > 0) console.log(pathIds);

  let animate = cy.elements().filter((e) => pathIds.includes(e.data().id));

  // Sort the animate list according to the pathway ID list (for sequential animation)
  animate = animate.sort((x, y) => pathIds.indexOf(x.data().id) - pathIds.indexOf(y.data().id));

  // if (animate.length > 0) console.log(animate.map((e) => e.data().id));

  let fade = cy.elements().filter((e) => !pathIds.includes(e.data().id));
  // Do not include the starting KPa in fade list (because looks better)
  fade = fade.filter((e) => e.data().id !== animate[0].data().parent);

  return { animate, fade };
};

const Pathway = ({ data, stylesheet, layout, elements, selectedPath }) => {
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
    for (let i = 0; i < 100000; i += 1) clearTimeout(i);
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
          regulatory: data.regulatory,
          stoppingReasons: data.stoppingReasons,
          observation: data.observation,
        },
        0
      );
    }
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      hideTooltips();
    };
  }, []);

  // Set currently animated elements
  useEffect(() => {
    setAnimateElements(getElementsToAnimate(cy, selectedPath));
  }, [selectedPath]);

  const resetPathwayVisuals = () => {
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
  };

  const playAnimation = () => {
    // Fade nodes outside the animation
    animateElements.fade.addClass('fade');
    animatePath(
      animateElements.animate,
      {
        regulatory: data.regulatory,
        stoppingReasons: data.stoppingReasons,
        observation: data.observation,
      },
      50
    );
  };

  useEffect(() => {
    resetPathwayVisuals();
    playAnimation();
    // Resize event listener
    cy.on('resize', () => {
      runLayout();
    });
  });

  return (
    <div>
      <CytoscapeComponent
        cy={(cy) => {
          setCy(cy);
        }}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '800px' }}
      />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ExtraButtons cy={cy} runLayout={runLayout} toggleFade={toggleFade} toggleTooltips={toggleTooltips} />
      </div>
    </div>
  );
};

export default Pathway;
