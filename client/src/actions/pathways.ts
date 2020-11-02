import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { pick } from 'lodash';
import { CollectionReturnValue } from 'cytoscape';

import { store } from 'index';
import { fetchFromApi } from 'api/api';
import { formatObservation, getExplanationForPath } from './util';

import {
  ACTION,
  AddInspectPathAction,
  ChangeSelectedPathAction,
  GetPathwayDataAction,
  RemoveAllInspectPathsAction,
  SetCxtMenuAction,
  SetElementsToAnimateAction,
  SetPathExplanationAction,
  SetSelectedInputsAction,
} from './types';

export const addInspectPath = (path: string[]): AddInspectPathAction => {
  return {
    type: ACTION.ADD_INSPECT_PATH,
    payload: path,
  };
};

export const changeSelectedPath = (
  path: string[]
): ChangeSelectedPathAction => {
  return {
    type: ACTION.CHANGE_SELECTED_PATH,
    payload: path,
  };
};

export const setPathExplanation = (
  selectedPath: string[]
): SetPathExplanationAction => {
  // @ts-ignore
  const data: Pathway.PathwayData = store.getState().pathwayData;

  const reversedPath = [...selectedPath].reverse();
  const pathDetails = getExplanationForPath(
    reversedPath,
    data.observation,
    data.regulatory,
    data.stoppingReasons
  );

  return {
    type: ACTION.SET_PATH_EXPLANATION,
    payload: pathDetails,
  };
};

export const setCxtMenu = (cxtMenu: CxtMenu): SetCxtMenuAction => {
  return {
    type: ACTION.SET_CXT_MENU,
    payload: cxtMenu,
  };
};

const fetchPathwayData = async (params: {
  cellLine: string;
  perturbagen: string;
  substrate: string;
  onlyKinaseEnds: boolean;
}) => {
  const response = await fetchFromApi('/api/pathway', params);
  return response;
};

const fetchObservationData = async (params: {
  perturbagen: string;
  cellLine: string;
}) => {
  const response = await fetchFromApi('/api/observation', params);
  return response.map((row: Observation) =>
    pick(row, ['substrate', 'fold_change', 'p_value'])
  );
};

export const getPathwayData = (
  cellLine: string,
  perturbagen: string,
  substrate: string,
  onlyKinaseEnds: boolean
): ThunkAction<void, RootState, unknown, GetPathwayDataAction> => async (
  dispatch: Dispatch
) => {
  const pathwayParams = { cellLine, perturbagen, substrate, onlyKinaseEnds };
  const observationParams = { perturbagen, cellLine };

  const [pathwayData, observationData] = await Promise.all([
    fetchPathwayData(pathwayParams),
    fetchObservationData(observationParams),
  ]);

  if (!pathwayData || !observationData) return;

  const formattedObservation = formatObservation(
    pathwayData.phosphosites,
    observationData
  );

  dispatch({
    type: ACTION.GET_PATHWAY_DATA,
    payload: { observation: formattedObservation, ...pathwayData },
  });
};

export const removeAllInspectPaths = (): RemoveAllInspectPathsAction => {
  return {
    type: ACTION.REMOVE_ALL_INSPECT_PATHS,
  };
};

export const setElementsToAnimate = (elementsToAnimate: {
  elementsToShow: CollectionReturnValue;
  elementsToFade: CollectionReturnValue;
}): SetElementsToAnimateAction => {
  return {
    type: ACTION.SET_ELEMENTS_TO_ANIMATE,
    payload: elementsToAnimate,
  };
};

export const setSelectedInputs = (inputs: {
  cellLine: string;
  perturbagen: string;
  substrate: string;
  onlyKinaseEnds: boolean;
}): SetSelectedInputsAction => {
  return {
    type: ACTION.SET_SELECTED_INPUTS,
    payload: inputs,
  };
};
