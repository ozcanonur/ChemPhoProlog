/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import cxtmenu from 'cytoscape-cxtmenu';
import { hideAll as hideTooltips } from 'tippy.js';

import ExtraButtons from 'views/Pathway/ExtraButtons';
import animatePath from 'views/Pathway/CytoscapeUtils/animation';

import addSidebarRouteKinase from 'actions/Sidebar/addSidebarRouteKinase';
import { useDispatch } from 'react-redux';

import kinaseIds from 'views/Pathway/variables/kinaseIds';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);
Cytoscape.use(cxtmenu);

const getElementsToAnimate = (cy, selectedPath) => {
  const pathIds = [];
  selectedPath.forEach((node, index) => {
    if (index % 2 === 0) pathIds.push(node);
    else {
      pathIds.push(`${node}to${selectedPath[index - 1]}`);
      pathIds.push(node);
    }
  });

  let animate = cy.elements().filter((e) => pathIds.includes(e.data().id));
  // Sort the animate list according to the pathway ID list (for sequential animation)
  animate = animate.sort((x, y) => pathIds.indexOf(x.data().id) - pathIds.indexOf(y.data().id));

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

  const dispatch = useDispatch();
  const cxtmenuOptions = {
    menuRadius: 100,
    selector: '.KPa', // elements matching this Cytoscape.js selector will trigger cxtmenus
    commands: [
      {
        fillColor: 'rgba(0, 0, 0, 0.4)', // optional: custom background color for item
        content: 'Add to sidebar', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => {
          dispatch(addSidebarRouteKinase(ele.data().id));
        },
        enabled: true, // whether the command is selectable
      },
      {
        fillColor: 'rgba(250, 190, 88, 0.4)', // optional: custom background color for item
        content: 'Go to UniProt', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => {
          const id = kinaseIds[ele.data().id];
          window.open(`https://www.uniprot.org/uniprot/${id}`, '_blank');
        },
        enabled: true, // whether the command is selectable
      },
    ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
    fillColor: 'rgba(0, 0, 0, 0.4)', // the background colour of the menu
    activeFillColor: 'rgba(75, 119, 190, 0.6)', // the colour used to indicate the selected command
    activePadding: 20, // additional size in pixels for the active command
    indicatorSize: 24, // the size in pixels of the pointer to the active command
    separatorWidth: 3, // the empty spacing in pixels between successive commands
    spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 24, // the maximum radius in pixels of the spotlight
    openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
    itemColor: 'white', // the colour of text in the command's content
    itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
    zIndex: 9999, // the z-index of the ui div
    atMouse: false, // draw menu at mouse position
  };

  return (
    <div>
      <CytoscapeComponent
        cy={(cy) => {
          cy.cxtmenu(cxtmenuOptions);
          setCy(cy);
        }}
        elements={elements}
        stylesheet={stylesheet}
        style={{ height: '800px' }}
        minZoom={0.5}
        maxZoom={1.5}
        boxSelectionEnabled
      />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ExtraButtons cy={cy} runLayout={runLayout} toggleFade={toggleFade} toggleTooltips={toggleTooltips} />
      </div>
    </div>
  );
};

export default Pathway;
