import { combineReducers } from 'redux';
import { extraSidebarRoutes } from './main';

import {
  cxtMenu,
  elementsToAnimate,
  inputs,
  inspectList,
  pathExplanation,
  pathwayData,
  selectedPath,
  pathwayHelpersOpen,
} from './pathways';

export default combineReducers({
  // main
  extraSidebarRoutes,
  // pathways
  pathsInspectList: inspectList,
  selectedPath,
  pathwayData,
  pathwayInputs: inputs,
  elementsToAnimate,
  cxtMenu,
  pathExplanation,
  pathwayHelpersOpen,
});
