import { combineReducers } from 'redux';
import { extraSidebarRoutes } from './main';

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
