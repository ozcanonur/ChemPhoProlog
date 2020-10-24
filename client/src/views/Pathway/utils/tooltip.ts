/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import tippy, { sticky, hideAll as hideTooltips } from 'tippy.js';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import './tooltip.css';
import { animatePath } from 'views/Pathway/utils/animation';
import { clearAllTimeouts } from 'views/Pathway/utils/misc';

const makeTooltip = (element, content, placement) => {
  const ref = element.popperRef();

  const dummyDomEle = document.createElement('div');

  const tippyInstance = tippy(dummyDomEle, {
    onCreate: (instance) => {
      instance.popperInstance.reference = ref;
    },
    content,
    placement,
    showOnCreate: true,
    lazy: false, // mandatory
    trigger: 'manual', // mandatory
    arrow: true,
    hideOnClick: false,
    multiple: true,
    sticky: true, // causes the route change crash bug
    plugins: [sticky],
    allowHTML: true,
    inertia: true,
    interactive: true,
    appendTo: document.body,
    animation: 'scale',
    theme: 'theme',
  });

  return tippyInstance;
};

const setupTooltip = (element, content) => {
  const tooltip = makeTooltip(element, content, 'bottom');
  element.on('tap', () => (tooltip.state.isVisible ? tooltip.hide() : tooltip.show()));
  return tooltip;
};

export const popErrorTooltip = (element, content, duration) => {
  const tooltip = setupTooltip(element, content, 'bottom');
  setTimeout(() => {
    tooltip.hide();
  }, duration);
  return tooltip;
};

const addStartTooltip = (element, fold_change, pValue) => {
  const content = `Start <br/> fc: ${fold_change} <br/> p: ${pValue}`;
  setupTooltip(element, content);
};

const addPhosphositeTooltip = (element, foldChange, pValue, stoppingReason) => {
  const stopReasonText = stoppingReason !== undefined ? `Stopped: ${stoppingReason}` : '';
  const content = `fc: ${foldChange} <br/> p: ${pValue} <br/> ${stopReasonText}`;
  setupTooltip(element, content);
};

const addEndKPaTooltip = (element, stoppingReason) => {
  const content = `Stop: ${stoppingReason}`;
  setupTooltip(element, content);
};

export const addTooltip = (data, element, isStartNode, isLastNode) => {
  const { stoppingReasons, observation } = data;
  const { id } = element.data();

  const isPhosphosite = element.data().id.includes('(') && !element.data().target;
  const isKPa = element.data().parent === undefined;

  // At last node and it's a KPa
  if (isLastNode && isKPa) addEndKPaTooltip(element, stoppingReasons[id]);
  else if (isPhosphosite) {
    const foldChange = observation[id].fold_change;
    const pValue = observation[id].p_value;
    const stoppingReason = stoppingReasons[id];

    if (isStartNode) addStartTooltip(element, foldChange, pValue);
    else if (isLastNode) addPhosphositeTooltip(element, foldChange, pValue, stoppingReason);
    else addPhosphositeTooltip(element, foldChange, pValue);
  }
};

export const toggleTooltips = (data, elementsToAnimate) => {
  clearAllTimeouts();

  if (document.getElementsByClassName('tippy-popper').length !== 0) hideTooltips();
  else animatePath(elementsToAnimate, data, 0, true, true);
};
