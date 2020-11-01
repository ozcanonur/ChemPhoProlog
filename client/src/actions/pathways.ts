import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { pick } from 'lodash';
import { CollectionReturnValue } from 'cytoscape';
import { store } from 'index';
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
  const data: Pathway.PathwayData = store.getState().pathwayData || {
    paths: [],
    relations: {},
    phosphosites: [],
    regulatory: {},
    stoppingReasons: {},
    observation: {},
  };

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
  try {
    const response = await axios.get<Pathway.PathwayDataFromAPI>(
      '/api/pathway',
      { params }
    );
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

const fetchObservationData = async (params: {
  perturbagen: string;
  cellLine: string;
}) => {
  try {
    const response = await axios.get('/api/observation', {
      params,
    });
    // Pick relevant fields only
    const parsedResponse = response.data.map((row: Observation) =>
      pick(row, ['substrate', 'fold_change', 'p_value'])
    );
    return parsedResponse;
  } catch (err) {
    return console.error(err);
  }
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
