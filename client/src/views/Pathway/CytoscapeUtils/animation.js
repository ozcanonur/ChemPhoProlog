import { addTooltip } from 'views/Pathway/CytoscapeUtils/tooltip';
import { phosphatases } from 'views/Pathway/variables/phosphatases';

const getParentActivityClass = (element, observation, regulatory) => {
  const foldChange = observation[element.data().id].fold_change;
  const reg = regulatory[element.data().id];
  const KPaActivated = (foldChange > 0 && reg === 'p_inc') || (foldChange < 0 && reg === 'p_dec');
  const KPaInhibited = (foldChange > 0 && reg === 'p_dec') || (foldChange < 0 && reg === 'p_inc');

  if (KPaActivated) return 'highlightedKPaActivated';
  else if (KPaInhibited) return 'highlightedKPaInhibited';
  else return 'highlightedKPaConflicting';
};

const addEdgeStyle = (element) => {
  const sourceIsPhosphatase = phosphatases.includes(element.data().source);
  if (sourceIsPhosphatase) element.addClass('highlightedPhosphataseEdge');
  else element.addClass('highlightedKinaseEdge');
};

const addPhosphositeAndParentStyle = (element, observation, regulatory) => {
  element.addClass('highlightedPhosphosite');
  const parentActivityClass = getParentActivityClass(element, observation, regulatory);
  element.parent().addClass(parentActivityClass);
};

export const animatePath = (animateElements, pathData, duration) => {
  const { regulatory, observation } = pathData;

  let i = 0;
  const highlightNextEle = () => {
    if (i < animateElements.length) {
      const element = animateElements[i];

      const isEdge = element.data().target !== undefined;
      const isPhosphosite = element.data().parent !== undefined;

      if (isEdge) addEdgeStyle(element);
      else if (isPhosphosite) addPhosphositeAndParentStyle(element, observation, regulatory);

      addTooltip(i, element, animateElements, pathData);
    }

    i++;
    setTimeout(highlightNextEle, duration);
  };

  highlightNextEle();
};
