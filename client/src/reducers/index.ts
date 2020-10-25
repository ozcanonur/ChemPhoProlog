import { combineReducers } from 'redux';

import {
  currentPageKinase,
  currentPagePerturbagen,
  extraSidebarRoutes,
  kinaseData,
  perturbagenData,
  selectedKinase,
  selectedPerturbagen,
} from './main';

import {
  cxtMenu,
  cy,
  elementsToAnimate,
  inputs,
  inspectList,
  pathExplanation,
  pathwayData,
  selectedPath,
} from './pathways';

export default combineReducers({
  // main
  kinaseData,
  selectedKinase,
  currentPageKinase,
  perturbagenData,
  selectedPerturbagen,
  currentPagePerturbagen,
  extraSidebarRoutes,
  // pathways
  pathsInspectList: inspectList,
  selectedPath,
  pathwayData,
  pathwayInputs: inputs,
  cy,
  elementsToAnimate,
  cxtMenu,
  pathExplanation,
});
