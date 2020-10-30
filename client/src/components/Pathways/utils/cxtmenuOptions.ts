import kinases from 'variables/kinases';
import phosphatases from 'variables/phosphatases';
import { popErrorTooltip } from 'components/Pathways/utils/tooltip';
import { store } from 'index';

import { addSidebarRoute } from 'actions/main';
import {
  setSelectedInputs,
  getPathwayData,
  removeAllInspectPaths,
  setElementsToAnimate,
} from 'actions/pathways';

import Cytoscape, { NodeSingular } from 'cytoscape';
import { Dispatch } from 'react';

const submitPathwayFromSelectedEle = (
  ele: NodeSingular,
  dispatch: Dispatch<any>
) => {
  const inputs = store.getState().pathwayInputs;
  const newInputs = { ...inputs, substrate: ele.data().id };
  const { cellLine, perturbagen, substrate, onlyKinaseEnds } = newInputs;
  // Need to get the phosphosite out of its parent or it crashes
  ele.move({
    parent: null,
  });
  // Dispatch > render new pathway
  dispatch(setSelectedInputs(newInputs));
  dispatch(getPathwayData(cellLine, perturbagen, substrate, onlyKinaseEnds));
  dispatch(removeAllInspectPaths());
  dispatch(
    setElementsToAnimate({
      elementsToShow: Cytoscape().collection(),
      elementsToFade: Cytoscape().collection(),
    })
  );
};

const openUniprot = (ele: NodeSingular) => {
  const id = kinases[ele.data().id] || phosphatases[ele.data().id];
  window.open(`https://www.uniprot.org/uniprot/${id}`, '_blank');
};

const cxtmenuOptions = (dispatch: Dispatch<any>): any => {
  return {
    menuRadius: 120,
    selector: '.KPa, .phosphosite',
    commands: [
      {
        fillColor: 'rgba(0, 0, 0, 0.4)',
        content: 'Add to sidebar',
        contentStyle: {
          fontWeight: 500,
        },
        select: (ele: NodeSingular) => {
          const { id } = ele.data();
          const isPhosphosite = id.includes('(');
          if (isPhosphosite)
            popErrorTooltip(ele, 'Not available for phosphosites', 2000);
          else dispatch(addSidebarRoute('kinase', id));
        },
        enabled: true,
      },
      {
        fillColor: 'rgba(45,65,89, 0.5)',
        content: 'Go to UniProt',
        contentStyle: {
          fontWeight: 500,
        },
        select: (ele: NodeSingular) => {
          const { id } = ele.data();
          const isPhosphosite = id.includes('(');
          if (isPhosphosite)
            popErrorTooltip(ele, 'Not available for phosphosites', 2000);
          else openUniprot(ele);
        },
        enabled: true,
      },
      {
        fillColor: 'rgba(45,65,89, 0.8)',
        content: 'Pathway from',
        contentStyle: {
          fontWeight: 500,
        },
        select: (ele: NodeSingular) => {
          const { id } = ele.data();
          const isPhosphosite = id.includes('(');
          if (isPhosphosite) submitPathwayFromSelectedEle(ele, dispatch);
          else popErrorTooltip(ele, 'Only available for phosphosites', 2000);
        },
        enabled: true,
      },
    ],
    fillColor: 'rgba(0, 0, 0, 0.4)',
    activeFillColor: 'rgba(229,173,6, 0.4)', // the colour used to indicate the selected command
    activePadding: 20, // additional size in pixels for the active command
    indicatorSize: 24, // the size in pixels of the pointer to the active command
    separatorWidth: 3, // the empty spacing in pixels between successive commands
    spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 24, // the maximum radius in pixels of the spotlight
    openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
    itemColor: 'white',
    itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
    zIndex: 9999,
    atMouse: false,
  };
};

export default cxtmenuOptions;
