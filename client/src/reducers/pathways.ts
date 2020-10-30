import Cytoscape, { Core } from 'cytoscape';
import { uniqWith } from 'lodash';

export const cxtMenu = (state = null, action: any) => {
  switch (action.type) {
    case 'SET_CXT_MENU':
      return action.payload;
    default:
      return state;
  }
};

export const cy = (state: Core | null = null, action: any) => {
  switch (action.type) {
    case 'SET_CY':
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
  action: any
) => {
  switch (action.type) {
    case 'SET_ELEMENTS_TO_ANIMATE':
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
  action: any
) => {
  switch (action.type) {
    case 'SET_SELECTED_INPUTS':
      return action.payload;
    default:
      return state;
  }
};

export const inspectList = (state = [], action: any) => {
  const filterDuplicates = () =>
    uniqWith([...state, action.payload], (x, y) => {
      const xId = x[0];
      const yId = y[0];
      return xId === yId;
    });

  switch (action.type) {
    case 'ADD_INSPECT_PATH':
      return filterDuplicates();
    case 'REMOVE_ALL_INSPECT_PATHS':
      return [];
    default:
      return state;
  }
};

export const pathExplanation = (state = [], action: any) => {
  switch (action.type) {
    case 'SET_PATH_EXPLANATION':
      return action.payload;
    default:
      return state;
  }
};

export const pathwayData = (state = null, action: any) => {
  switch (action.type) {
    case 'GET_PATHWAY_DATA':
      return action.payload;
    default:
      return state;
  }
};

export const selectedPath = (state = [], action: any) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_PATH':
      return action.payload;
    default:
      return state;
  }
};
