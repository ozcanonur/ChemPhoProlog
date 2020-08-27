/* eslint-disable camelcase */
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
      // eslint-disable-next-line no-param-reassign
      instance.popperInstance.reference = ref;
    },
    content,
    placement,
    lazy: false, // mandatory
    trigger: 'manual', // mandatory
    arrow: true,
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
  const content = `<div>Start <br/>fc: ${fold_change} <br/>p: ${p_value} <br/></div>`;
  setupTooltipAndShow(element, content);
};

const addPhosphositeTooltip = (element, foldChange, p_value, stoppingReason) => {
  const stopReasonText = stoppingReason !== undefined ? `Stopped: ${stoppingReason}` : '';
  const content = `<div>fc: ${foldChange} <br/>p: ${p_value} <br/>${stopReasonText}</div>`;
  setupTooltipAndShow(element, content);
};

const addEndKPaTooltip = (element, stoppingReason) => {
  const content = `<div>Stop: ${stoppingReason}</div>`;
  setupTooltipAndShow(element, content);
};

const addTooltip = (i, element, animateElements, pathData) => {
  const { stoppingReasons, observation } = pathData;
  // Phosphosite
  const { id } = element.data();

  const isStartNode = i === 0;
  const isLastNode = i === animateElements.length - 1;
  const isPhosphosite = element.data().parent !== undefined;
  const isKPa = element.data().parent === undefined;

  // At last node and it's a KPa
  if (isLastNode && isKPa) addEndKPaTooltip(element, stoppingReasons[id]);
  else if (isPhosphosite) {
    const foldChange = observation[id].fold_change;
    const pValue = observation[id].p_value;
    const stopReason = stoppingReasons[id];

    if (isStartNode) addStartTooltip(element, foldChange, pValue);
    else if (isLastNode) addPhosphositeTooltip(element, foldChange, pValue, stopReason);
    else addPhosphositeTooltip(element, foldChange, pValue);
  }
};

export default addTooltip;
