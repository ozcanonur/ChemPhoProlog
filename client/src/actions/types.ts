import { CollectionReturnValue } from 'cytoscape';

export enum ACTION {
  // main
  ADD_SIDEBAR_ROUTE,
  REMOVE_SIDEBAR_ROUTE,
  // pathways
  ADD_INSPECT_PATH,
  CHANGE_SELECTED_PATH,
  GET_PATHWAY_DATA,
  REMOVE_ALL_INSPECT_PATHS,
  SET_CY,
  SET_CXT_MENU,
  SET_ELEMENTS_TO_ANIMATE,
  SET_PATH_EXPLANATION,
  SET_SELECTED_INPUTS,
  TOGGLE_PATHWAY_HELPERS,
}

export type AddSidebarRouteAction = {
  type: ACTION.ADD_SIDEBAR_ROUTE;
  payload: string;
};

export type RemoveSidebarRouteAction = {
  type: ACTION.REMOVE_SIDEBAR_ROUTE;
  payload: string;
};

export type AddInspectPathAction = {
  type: ACTION.ADD_INSPECT_PATH;
  payload: string[];
};

export type ChangeSelectedPathAction = {
  type: ACTION.CHANGE_SELECTED_PATH;
  payload: string[];
};

export type GetPathwayDataAction = {
  type: ACTION.GET_PATHWAY_DATA;
  payload: Pathway.PathwayData;
};

export type SetCxtMenuAction = {
  type: ACTION.SET_CXT_MENU;
  payload: CxtMenu;
};

export type RemoveAllInspectPathsAction = {
  type: ACTION.REMOVE_ALL_INSPECT_PATHS;
};

export type SetElementsToAnimateAction = {
  type: ACTION.SET_ELEMENTS_TO_ANIMATE;
  payload: {
    elementsToShow: CollectionReturnValue;
    elementsToFade: CollectionReturnValue;
  };
};

export type SetPathExplanationAction = {
  type: ACTION.SET_PATH_EXPLANATION;
  payload: string[][];
};

export type SetSelectedInputsAction = {
  type: ACTION.SET_SELECTED_INPUTS;
  payload: {
    cellLine: string;
    perturbagen: string;
    substrate: string;
    onlyKinaseEnds: boolean;
  };
};

export type TogglePathwayHelpersAction = {
  type: ACTION.TOGGLE_PATHWAY_HELPERS;
};
