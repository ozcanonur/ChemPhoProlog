import React, { useEffect } from 'react';

import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';

import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import { runLayout } from 'views/Pathway/utils/misc';
import { animatePath } from 'views/Pathway/utils/animation';

import { hideAll as hideTooltips } from 'tippy.js';

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);

const Pathway = ({ pathwayData, stylesheet, layout, elements, selectedPath }) => {
  const cleanAllTimeouts = () => {
    for (var i = 0; i < 100000; i++) clearTimeout(i);
  };

  let cyCore = null;
  let collectionToFade = [];

  const toggleFadeCollection = (collection) => {
    collection.toggleClass('fade');
  };

  const toggleTooltips = () => {
    if (document.getElementsByClassName('tippy-popper').length !== 0) hideTooltips();
    else {
      const collections = animatePath(
        cyCore,
        selectedPath,
        pathwayData.regulatory,
        pathwayData.stoppingReasons,
        pathwayData.observation,
        0
      );

      collectionToFade = collections.fadeCollection;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup animation timeouts
      cleanAllTimeouts();
      // Clear tooltips
      hideTooltips();
    };
  }, []);

  // Additional tweaks
  const extras = (cy) => {
    cyCore = cy;
    runLayout(cy, layout);

    const collections = animatePath(
      cy,
      selectedPath,
      pathwayData.regulatory,
      pathwayData.stoppingReasons,
      pathwayData.observation,
      200
    );

    collectionToFade = collections.fadeCollection;
  };

  return (
    <div style={{ position: 'relative' }}>
      <CytoscapeComponent
        cy={(cy) => extras(cy)}
        elements={elements}
        style={{ height: '800px' }}
        stylesheet={stylesheet}
        selectedPath={selectedPath}
      />
      <GridContainer direction='column' style={{ position: 'absolute', bottom: 0 }}>
        <GridItem md>
          <Button
            onClick={() => toggleFadeCollection(collectionToFade)}
            color={'warning'}
            style={{ width: '100%' }}>
            Toggle Nodes
          </Button>
        </GridItem>
        <GridItem md>
          <Button
            onClick={() => {
              cleanAllTimeouts();
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
