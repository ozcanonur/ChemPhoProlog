import { addTooltip } from 'views/Pathway/CytoscapeUtils/tooltip';
import phosphatases from 'views/Pathway/variables/phosphatases';

export const getElementsToAnimate = (cy, selectedPath) => {
  const pathIds = [];
  selectedPath.forEach((node, index) => {
    if (index % 2 === 0) pathIds.push(node);
    else {
      pathIds.push(`${node}to${selectedPath[index - 1]}`);
      pathIds.push(node);
    }
  });

  const allElements = cy.elements();

  // Sort the animate list according to the pathway ID list (for sequential animation)
  let elementsToShow = allElements.filter((e) => pathIds.includes(e.data().id));
  elementsToShow = elementsToShow.sort((x, y) => pathIds.indexOf(x.data().id) - pathIds.indexOf(y.data().id));

  // Do not include the starting KPa in fade list (because it looks better)
  let elementsToFade = cy.collection();
  if (elementsToShow.length !== 0)
    elementsToFade = allElements.filter(
      (e) => !pathIds.includes(e.data().id) && e.data().id !== elementsToShow[0].data().parent
    );

  return { elementsToShow, elementsToFade };
};

const getParentActivityClass = (element, observation, regulatory) => {
  const { id } = element.data();

  const foldChange = observation[id].fold_change;
  const reg = regulatory[id];

  const KPaActivated = (foldChange > 0 && reg === 'p_inc') || (foldChange < 0 && reg === 'p_dec');
  const KPaInhibited = (foldChange > 0 && reg === 'p_dec') || (foldChange < 0 && reg === 'p_inc');

  if (KPaActivated) return 'highlightedKPaActivated';
  if (KPaInhibited) return 'highlightedKPaInhibited';

  return 'highlightedKPaConflicting';
};

const addEdgeStyle = (element) => {
  const sourceIsPhosphatase = Object.keys(phosphatases).includes(element.data().source);

  if (sourceIsPhosphatase) element.addClass('highlightedPhosphataseEdge');
  else element.addClass('highlightedKinaseEdge');
};

const addPhosphositeStyle = (element) => {
  element.addClass('highlightedPhosphosite');
};

const addPhosphositeParentStyle = (element, observation, regulatory) => {
  const parentActivityClass = getParentActivityClass(element, observation, regulatory);
  element.parent().addClass(parentActivityClass);
};

export const animatePath = (elementsToAnimate, data, duration, showTooltips, showParentActivity) => {
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

      if (showTooltips) {
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
