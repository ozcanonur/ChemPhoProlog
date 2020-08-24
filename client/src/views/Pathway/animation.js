import { addTooltips } from 'views/Pathway/tooltips';

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

export const animatePath = (cy, path, regulatory, stoppingReasons, observation) => {
  const collections = getCollections(cy, path);

  const pathToAnimate = collections.animateCollection;
  let i = 0;
  const highlightNextEle = () => {
    if (i < pathToAnimate.length) {
      const element = pathToAnimate[i];

      // Color animations
      element.addClass('highlighted');

      // Tooltips, don't add on edges
      if (element.data().parent !== undefined)
        addTooltips(i, pathToAnimate, element, regulatory, stoppingReasons, observation);

      i++;
      setTimeout(highlightNextEle, 500);
    }
  };

  highlightNextEle();

  return collections;
};
