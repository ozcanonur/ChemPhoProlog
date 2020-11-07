import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { CollectionReturnValue } from 'cytoscape';

import { store } from 'index';
import { fetchFromApi } from 'utils/api';
import { getExplanationForPath } from './helpers';

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

export const changeSelectedPath = (path: string[]): ChangeSelectedPathAction => {
  return {
    type: ACTION.CHANGE_SELECTED_PATH,
    payload: path,
  };
};

export const setPathExplanation = (selectedPath: string[]): SetPathExplanationAction => {
  // @ts-ignore
  const data: Pathway.PathwayData = store.getState().pathwayData;

  const reversedPath = [...selectedPath].reverse();
  const pathDetails = getExplanationForPath(reversedPath, data.observation, data.regulatory, data.stoppingReasons);

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

const formatPathwayObservation = (resObservation: Observation[]) => {
  const formattedObservation: {
    [key: string]: { fold_change: string; p_value: string };
  } = {};
  resObservation.forEach(({ substrate: substrateObs, fold_change, p_value }) => {
    formattedObservation[substrateObs] = {
      fold_change: parseFloat(fold_change).toFixed(2),
      p_value: parseFloat(p_value).toFixed(2),
    };
  });

  return formattedObservation;
};

export const getPathwayData = (
  cellLine: string,
  perturbagen: string,
  substrate: string,
  onlyKinaseEnds: boolean
): ThunkAction<void, RootState, unknown, GetPathwayDataAction> => async (dispatch: Dispatch) => {
  const resPathway = await fetchFromApi('/api/pathway', { cellLine, perturbagen, substrate, onlyKinaseEnds });
  const resObservation: Observation[] = await fetchFromApi('/apiWeb/observationForPathway', {
    perturbagen,
    cellLine,
    substrates: resPathway.phosphosites,
  });
  const formattedPathwayObservation = formatPathwayObservation(resObservation);

  if (!resPathway || !formattedPathwayObservation) return;

  dispatch({
    type: ACTION.GET_PATHWAY_DATA,
    payload: { observation: formattedPathwayObservation, ...resPathway },
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
