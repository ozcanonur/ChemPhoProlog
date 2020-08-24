import { addTooltip } from 'views/Pathway/tooltips';
import { phosphatases } from 'views/Pathway/variables/phosphatases';

const getCollections = (cy, path) => {
  let pathwayIds = [];
  for (let i = 0; i < path.length; i++) {
    const currNode = path[i];
    if (i % 2 !== 0 || i === path.length - 1) {
      pathwayIds.push(`${currNode}to${path[i - 1]}`);
      pathwayIds.push(currNode);
    } else {
      pathwayIds.push(currNode);
    }
  }

  let animateCollection = cy.elements().filter((e) => pathwayIds.includes(e.data().id));
  animateCollection = animateCollection.sort(
    (x, y) => pathwayIds.indexOf(x.data().id) - pathwayIds.indexOf(y.data().id)
  );
  const fadeCollection = cy.elements().filter((e) => !pathwayIds.includes(e.data().id));

  return { animateCollection, fadeCollection };
};

export const animatePath = (cy, path, regulatory, stoppingReasons, observation, duration) => {
  const collections = getCollections(cy, path);

  const pathToFade = collections.fadeCollection;
  pathToFade.addClass('fade');

  const pathToAnimate = collections.animateCollection;
  let i = 0;
  const highlightNextEle = () => {
    if (i < pathToAnimate.length) {
      const element = pathToAnimate[i];

      const isEdge = element.data().target !== undefined;
      if (!isEdge) {
        // Color animations
        element.addClass('highlighted');
        // Tooltips, don't add on edges
        addTooltip(i, pathToAnimate, element, regulatory, stoppingReasons, observation);
      } else {
        const sourceIsPhosphatase = phosphatases.includes(element.data().source);
        if (sourceIsPhosphatase) element.addClass('highlightedPhosphataseEdge');
        else element.addClass('highlighted');
      }

      i++;
      setTimeout(highlightNextEle, duration);
    }
  };

  highlightNextEle();

  return collections;
};
