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

const makeTippy = (element, content, placement) => {
  const ref = element.popperRef();

  const dummyDomEle = document.createElement('div');

  return tippy(dummyDomEle, {
    onCreate: (instance) => {
      instance.popperInstance.reference = ref;
    },
    content: content,

    lazy: false, // mandatory
    trigger: 'manual', // mandatory
    arrow: true,
    placement: placement,
    hideOnClick: false,
    multiple: true,
    sticky: true,
    plugins: [sticky],
    allowHTML: true,
    inertia: true,
    interactive: true,
    appendTo: document.body, // or append dummyDomEle to document.body
  });
};

const phosphositeTooltip = (fold_change, p_value, regulatory) => {
  return (
    '<div>' +
    `Fold change: ${fold_change} <br/>` +
    `p value: ${p_value} <br/>` +
    `Reg: ${regulatory}` +
    '</div>'
  );
};

// TODO YOU NEED TO CHECK PHOSPHOTASE OR KINASE WHEN CHECKING ACTIVATED/INHIBITED
const KPaTooltip = (foldChange, regulatory) => {
  let activated = '';
  if (foldChange > 0 && regulatory === 'p_inc') activated = 'Activated';
  else if (foldChange < 0 && regulatory === 'p_dec') activated = 'Activated';
  else if (regulatory === 'unknown') activated = 'Unknown';
  else if (regulatory === 'conflicting') activated = 'Conflicting';
  else activated = 'Inhibited';

  return '<div>' + `${activated}` + '</div>';
};

export const animatePath = (cy, pathway, regulatory, stoppingReasons, observation) => {
  const pathToAnimate = getCollectionToAnimate(cy, pathway);

  console.log(pathToAnimate);
  let i = 0;
  const highlightNextEle = () => {
    if (i < pathToAnimate.length) {
      const element = pathToAnimate[i];

      // Color animations
      if (i === 0) element.addClass('startNode');
      else element.addClass('highlighted');

      // Tooltips
      if (element.data().parent !== undefined) {
        // Phosphosite
        const id = element.data().id;
        const phosphoContent = phosphositeTooltip(
          observation[id].fold_change,
          observation[id].p_value,
          regulatory[id]
        );
        makeTippy(element, phosphoContent, 'bottom').show();

        // Don't add on first or last node
        if (i !== 0 && i !== pathToAnimate.length - 1) {
          // KPa
          const parentKPa = element.parent()[0];
          const KPaContent = KPaTooltip(observation[id].fold_change, regulatory[id]);
          makeTippy(parentKPa, KPaContent, 'right-start').show();
        }
      }

      i++;
      setTimeout(highlightNextEle, 500);
    }
  };

  highlightNextEle();
};
