import tippy, { sticky } from 'tippy.js';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import './tooltip.css';

const makeTooltip = (element, content, placement) => {
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
    theme: 'theme',
  });
};

const setupTooltipAndShow = (element, content) => {
  const tooltip = makeTooltip(element, content, 'bottom');
  element.on('tap', () => (tooltip.state.isVisible ? tooltip.hide() : tooltip.show()));
  tooltip.show();
};

const addStartTooltip = (element, fold_change, p_value) => {
  const content = `<div>Start <br/>FC: ${fold_change} <br/>p: ${p_value} <br/></div>`;
  setupTooltipAndShow(element, content);
};

const addPhosphositeTooltip = (element, fold_change, p_value, regulatory, stoppingReason) => {
  const stopReasonText = stoppingReason !== undefined ? `Stopped: ${stoppingReason}` : '';
  const content =
    '<div>' +
    `FC: ${fold_change} <br/>` +
    `p: ${p_value} <br/>` +
    `Reg: ${regulatory}  <br/>` +
    `${stopReasonText}` +
    '</div>';

  setupTooltipAndShow(element, content);
};

const addEndKPaTooltip = (element, stoppingReason) => {
  const content = `<div>Stop: ${stoppingReason}</div>`;
  setupTooltipAndShow(element, content);
};

export const addTooltip = (i, element, animateElements, pathData) => {
  const { regulatory, stoppingReasons, observation } = pathData;
  // Phosphosite
  const id = element.data().id;

  const isStartNode = i === 0;
  const isLastNode = i === animateElements.length - 1;
  const isPhosphosite = element.data().parent !== undefined;
  const isKPa = element.data().parent === undefined;

  // At last node and it's a KPa
  if (isLastNode && isKPa) addEndKPaTooltip(element, stoppingReasons[id]);
  else if (isPhosphosite) {
    const observationValue = observation[id].fold_change;
    const pValue = observation[id].p_value;
    const reg = regulatory[id];
    const stopReason = stoppingReasons[id];

    if (isStartNode) addStartTooltip(element, observationValue, pValue);
    else if (isLastNode) addPhosphositeTooltip(element, observationValue, pValue, reg, stopReason);
    else addPhosphositeTooltip(element, observationValue, pValue, reg);
  }
};

// addKPaTooltip(element, observationValue, regulatory[id]);
// const addKPaTooltip = (element, foldChange, regulatory) => {
//   const parentKPa = element.parent()[0];

//   let activated = '';
//   if (foldChange > 0 && regulatory === 'p_inc') activated = 'Activated';
//   else if (foldChange < 0 && regulatory === 'p_dec') activated = 'Activated';
//   else if (regulatory === 'unknown') activated = 'Unknown';
//   else if (regulatory === 'conflicting') activated = 'Conflicting';
//   else activated = 'Inhibited';

//   const content = `<div>${activated}</div>`;

//   const tooltip = makeTippy(parentKPa, content, 'right-start');
//   parentKPa.on('tap', () => (tooltip.state.isVisible ? tooltip.hide() : tooltip.show()));
//   tooltip.show();
// };
