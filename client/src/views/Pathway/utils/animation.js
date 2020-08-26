import { addTooltip } from 'views/Pathway/utils/tooltip';
import { phosphatases } from 'views/Pathway/variables/phosphatases';

export const getCyElementsFromSelectedPath = (cy, selectedPath) => {
  let pathwayIds = [];
  for (let i = 0; i < selectedPath.length; i++) {
    const currNode = selectedPath[i];
    if (i % 2 !== 0 || i === selectedPath.length - 1) {
      pathwayIds.push(`${currNode}to${selectedPath[i - 1]}`);
      pathwayIds.push(currNode);
    } else pathwayIds.push(currNode);
  }

  let animate = cy.elements().filter((e) => pathwayIds.includes(e.data().id));
  const fade = cy.elements().filter((e) => !pathwayIds.includes(e.data().id));
  animate = animate.sort(
    (x, y) => pathwayIds.indexOf(x.data().id) - pathwayIds.indexOf(y.data().id)
  );

  return { animate, fade };
};

const getParentActivityClass = (element, observation, regulatory) => {
  const foldChange = observation[element.data().id].fold_change;
  const reg = regulatory[element.data().id];
  const KPaActivated = (foldChange > 0 && reg === 'p_inc') || (foldChange < 0 && reg === 'p_dec');
  const KPaInhibited = (foldChange > 0 && reg === 'p_dec') || (foldChange < 0 && reg === 'p_inc');

  if (KPaActivated) return 'highlightedKPaActivated';
  else if (KPaInhibited) return 'highlightedKPaInhibited';
  else return 'highlightedKPaConflicting';
};

export const animatePath = (animateElements, elementInfo, duration) => {
  const { regulatory, stoppingReasons, observation } = elementInfo;

  let i = 0;
  const highlightNextEle = () => {
    if (i < animateElements.length) {
      const element = animateElements[i];

      const isEdge = element.data().target !== undefined;
      const isPhosphosite = element.data().parent !== undefined;
      if (isEdge) {
        const sourceIsPhosphatase = phosphatases.includes(element.data().source);
        if (sourceIsPhosphatase) element.addClass('highlightedPhosphataseEdge');
        else element.addClass('highlightedKinaseEdge');
      } else if (isPhosphosite) {
        element.addClass('highlightedPhosphosite');
        const parentActivityClass = getParentActivityClass(element, observation, regulatory);
        element.parent().addClass(parentActivityClass);
      }

      addTooltip(i, animateElements, element, regulatory, stoppingReasons, observation);
    }

    i++;
    setTimeout(highlightNextEle, duration);
  };

  highlightNextEle();
};
