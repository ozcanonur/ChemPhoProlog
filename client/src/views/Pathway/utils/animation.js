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

export const animatePath = (animateElements, elementInfo, duration) => {
  const { regulatory, stoppingReasons, observation } = elementInfo;

  let i = 0;
  const highlightNextEle = () => {
    if (i < animateElements.length) {
      const element = animateElements[i];

      const isEdge = element.data().target !== undefined;
      if (isEdge) {
        const sourceIsPhosphatase = phosphatases.includes(element.data().source);

        if (sourceIsPhosphatase) element.addClass('highlightedPhosphataseEdge');
        else element.addClass('highlightedKinaseEdge');
      } else {
        const isPhosphosite = element.data().parent !== undefined;

        if (isPhosphosite) element.addClass('highlightedPhosphosite');
        else element.addClass('highlightedKPa');

        addTooltip(i, animateElements, element, regulatory, stoppingReasons, observation);
      }

      i++;
      setTimeout(highlightNextEle, duration);
    }
  };

  highlightNextEle();
};
