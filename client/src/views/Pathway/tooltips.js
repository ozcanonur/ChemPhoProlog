import tippy, { sticky } from 'tippy.js';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

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
    appendTo: document.body,
    animation: 'scale',
  });
};

const addStartTooltip = (element, fold_change, p_value) => {
  const content =
    '<div>' +
    'Start <br/>' +
    `Fold change: ${fold_change} <br/>` +
    `p value: ${p_value} <br/>` +
    '</div>';

  const tooltip = makeTippy(element, content, 'bottom');
  element.on('tap', () => (tooltip.state.isVisible ? tooltip.hide() : tooltip.show()));
  tooltip.show();
};

const addPhosphositeTooltip = (element, fold_change, p_value, regulatory, stoppingReason) => {
  const stopReasonText = stoppingReason !== undefined ? `Stopped: ${stoppingReason}` : '';
  const content =
    '<div>' +
    `Fold change: ${fold_change} <br/>` +
    `p value: ${p_value} <br/>` +
    `Reg: ${regulatory}  <br/>` +
    `${stopReasonText}` +
    '</div>';

  const tooltip = makeTippy(element, content, 'bottom');
  element.on('tap', () => (tooltip.state.isVisible ? tooltip.hide() : tooltip.show()));
  tooltip.show();
};

const addKPaTooltip = (element, foldChange, regulatory) => {
  const parentKPa = element.parent()[0];

  let activated = '';
  if (foldChange > 0 && regulatory === 'p_inc') activated = 'Activated';
  else if (foldChange < 0 && regulatory === 'p_dec') activated = 'Activated';
  else if (regulatory === 'unknown') activated = 'Unknown';
  else if (regulatory === 'conflicting') activated = 'Conflicting';
  else activated = 'Inhibited';

  const content = `<div>${activated}</div>`;

  const tooltip = makeTippy(parentKPa, content, 'right-start');
  parentKPa.on('tap', () => (tooltip.state.isVisible ? tooltip.hide() : tooltip.show()));
  tooltip.show();
};

export const addTooltips = (
  i,
  pathToAnimate,
  element,
  regulatory,
  stoppingReasons,
  observation
) => {
  // Phosphosite id
  const id = element.data().id;
  const observationValue = observation[id].fold_change;
  const pValue = observation[id].p_value;

  if (i === 0) addStartTooltip(element, observation[id].fold_change, observation[id].p_value);
  else if (i === pathToAnimate.length - 1)
    addPhosphositeTooltip(element, observationValue, pValue, regulatory[id], stoppingReasons[id]);
  else {
    addPhosphositeTooltip(element, observationValue, pValue, regulatory[id]);
    addKPaTooltip(element, observationValue, regulatory[id]);
  }
};
