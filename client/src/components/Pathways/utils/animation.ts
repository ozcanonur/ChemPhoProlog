/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import phosphatases from 'variables/phosphatases';
import { Core, Collection, SingularElementArgument, SingularElementReturnValue } from 'cytoscape';
import { addTooltip } from './tooltip';

export const getElementsToAnimate = (cy: Core | null, selectedPath: string[]) => {
  if (!cy) return;

  const elementsToShow: SingularElementReturnValue[] = [];
  const elementsToShowIds: string[] = [];
  selectedPath.forEach((node, index) => {
    // Add the edge connecting to the last node along with the node on even indexes
    if (index % 2 !== 0) {
      const edgeId = `${node}to${selectedPath[index - 1]}`;
      elementsToShowIds.push(edgeId);

      const edgeExists = cy.$(`[id='${edgeId}']`).length > 0;
      if (edgeExists) elementsToShow.push(cy.$(`[id='${edgeId}']`)[0]);
    }
    elementsToShowIds.push(node);
    const nodeExists = cy.$(`[id='${node}']`).length > 0;
    if (nodeExists) elementsToShow.push(cy.$(`[id='${node}']`)[0]);
  });

  // Do not include the starting KPa in fade list (because it looks better)
  let elementsToFade = cy.collection();
  if (elementsToShow.length !== 0)
    elementsToFade = cy
      .elements()
      .filter((e) => !elementsToShowIds.includes(e.data().id) && e.data().id !== elementsToShow[0].data().parent);

  return { elementsToShow: cy.collection(elementsToShow), elementsToFade };
};

const getParentActivityClass = (
  element: SingularElementArgument,
  observation: Pathway.PathwayObservation,
  regulatory: Pathway.Regulatory
) => {
  const { id } = element.data();

  const foldChange = parseFloat(observation[id].fold_change);
  const reg = regulatory[id];

  const KPaActivated = (foldChange > 0 && reg === 'p_inc') || (foldChange < 0 && reg === 'p_dec');
  const KPaInhibited = (foldChange > 0 && reg === 'p_dec') || (foldChange < 0 && reg === 'p_inc');

  if (KPaActivated) return 'highlightedKPaActivated';
  if (KPaInhibited) return 'highlightedKPaInhibited';

  return 'highlightedKPaConflicting';
};

const addEdgeStyle = (element: SingularElementArgument) => {
  const sourceIsPhosphatase = Object.keys(phosphatases).includes(element.data().source);

  if (sourceIsPhosphatase) element.addClass('highlightedPhosphataseEdge');
  else element.addClass('highlightedKinaseEdge');
};

const addPhosphositeStyle = (element: SingularElementArgument) => {
  element.addClass('highlightedPhosphosite');
};

const addPhosphositeParentStyle = (
  element: SingularElementArgument,
  observation: Pathway.PathwayObservation,
  regulatory: Pathway.Regulatory
) => {
  const parentActivityClass = getParentActivityClass(element, observation, regulatory);
  // @ts-ignore
  element.parent().addClass(parentActivityClass);
};

export const animatePath = (
  elementsToAnimate: { elementsToShow: Collection; elementsToFade: Collection } | undefined,
  data: Pathway.PathwayData,
  duration: number,
  showTooltips: boolean,
  showParentActivity: boolean
) => {
  if (!elementsToAnimate) return;

  const { regulatory, observation } = data;
  const { elementsToShow, elementsToFade } = elementsToAnimate;

  // Fade the remaining elements out of the path
  elementsToFade.addClass('fade');

  let i = 0;
  const highlightNextEle = () => {
    if (i < elementsToShow.length) {
      const element = elementsToShow[i];

      const isEdge = element.data().target !== undefined;
      const isPhosphosite = element.data().id.includes('(') && !element.data().target;

      if (isEdge) addEdgeStyle(element);
      else if (isPhosphosite) {
        addPhosphositeStyle(element);
        if (showParentActivity) addPhosphositeParentStyle(element, observation, regulatory);
      }

      if (showTooltips && element.isNode()) {
        const isStartNode = i === 0;
        const isLastNode = i === elementsToShow.length - 1;
        addTooltip(data, element, isStartNode, isLastNode);
      }
    }

    i += 1;
    setTimeout(highlightNextEle, duration);
  };

  highlightNextEle();
};
