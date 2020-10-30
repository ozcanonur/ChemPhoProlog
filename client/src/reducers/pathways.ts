import Cytoscape, { CollectionReturnValue, Core } from 'cytoscape';
import { uniqWith } from 'lodash';

import {
  ACTION,
  AddInspectPathAction,
  ChangeSelectedPathAction,
  GetPathwayDataAction,
  RemoveAllInspectPathsAction,
  SetCxtMenuAction,
  SetCyAction,
  SetElementsToAnimateAction,
  SetPathExplanationAction,
  SetSelectedInputsAction,
} from 'actions/types';

export const cxtMenu = (state = null, action: SetCxtMenuAction): any => {
  switch (action.type) {
    case ACTION.SET_CXT_MENU:
      return action.payload;
    default:
      return state;
  }
};

export const pathwayData = (
  state = null,
  action: GetPathwayDataAction
): Pathway.PathwayData | null => {
  switch (action.type) {
    case ACTION.GET_PATHWAY_DATA:
      return action.payload;
    default:
      return state;
  }
};

export const cy = (
  state: Core | null = null,
  action: SetCyAction
): Core | null => {
  switch (action.type) {
    case ACTION.SET_CY:
      return action.payload;
    default:
      return state;
  }
};

export const elementsToAnimate = (
  state = {
    elementsToShow: Cytoscape().collection(),
    elementsToFade: Cytoscape().collection(),
  },
  action: SetElementsToAnimateAction
): {
  elementsToShow: CollectionReturnValue;
  elementsToFade: CollectionReturnValue;
} => {
  switch (action.type) {
    case ACTION.SET_ELEMENTS_TO_ANIMATE:
      return action.payload;
    default:
      return state;
  }
};

export const inputs = (
  state = {
    cellLine: '',
    perturbagen: '',
    substrate: '',
    onlyKinaseEnds: true,
  },
  action: SetSelectedInputsAction
): {
  cellLine: string;
  perturbagen: string;
  substrate: string;
  onlyKinaseEnds: boolean;
} => {
  switch (action.type) {
    case ACTION.SET_SELECTED_INPUTS:
      return action.payload;
    default:
      return state;
  }
};

export const inspectList = (
  state = [],
  action: AddInspectPathAction | RemoveAllInspectPathsAction
): string[][] => {
  switch (action.type) {
    case ACTION.ADD_INSPECT_PATH:
      return uniqWith([...state, action.payload], (x, y) => {
        const xId = x[0];
        const yId = y[0];
        return xId === yId;
      });
    case ACTION.REMOVE_ALL_INSPECT_PATHS:
      return [];
    default:
      return state;
  }
};

export const pathExplanation = (
  state = [],
  action: SetPathExplanationAction
): string[][] => {
  switch (action.type) {
    case ACTION.SET_PATH_EXPLANATION:
      return action.payload;
    default:
      return state;
  }
};

export const selectedPath = (
  state = [],
  action: ChangeSelectedPathAction
): string[] => {
  switch (action.type) {
    case ACTION.CHANGE_SELECTED_PATH:
      return action.payload;
    default:
      return state;
  }
};
