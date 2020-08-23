import tippy, { sticky } from 'tippy.js';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

const getCollectionToAnimate = (cy, path) => {
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

  let collection = cy.elements().filter((e) => pathwayIds.includes(e.data().id));
  return collection.sort(
    (x, y) => pathwayIds.indexOf(x.data().id) - pathwayIds.indexOf(y.data().id)
  );
};

const makeTippy = (node, text) => {
  const ref = node.popperRef();

  const dummyDomEle = document.createElement('div');

  const tip = tippy(dummyDomEle, {
    onCreate: (instance) => {
      instance.popperInstance.reference = ref;
    },
    lazy: false, // mandatory
    trigger: 'manual', // mandatory

    // dom element inside the tippy:
    content: () => {
      const div = document.createElement('div');

      div.innerHTML = text;
      return div;
    },

    // your own preferences:
    arrow: true,
    placement: 'bottom',
    hideOnClick: false,
    multiple: true,
    sticky: true,
    plugins: [sticky],

    // if interactive:
    interactive: true,
    appendTo: document.body, // or append dummyDomEle to document.body
  });

  return tip;
};

export const animatePath = (cy, pathway) => {
  const pathToAnimate = getCollectionToAnimate(cy, pathway);

  let i = 0;
  const highlightNextEle = () => {
    if (i < pathToAnimate.length) {
      const element = pathToAnimate[i];

      // Color animations
      if (i === 0) element.addClass('startNode');
      else element.addClass('highlighted');

      // Tooltips
      if (element.data().parent !== undefined) {
        const tippy = makeTippy(element, 'foo');
        tippy.show();
      }

      i++;
      setTimeout(highlightNextEle, 500);
    }
  };

  highlightNextEle();
};
