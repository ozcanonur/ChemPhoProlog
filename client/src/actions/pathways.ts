import { getApi } from 'api/api';
import { pick } from 'lodash';

import { store } from 'index';
import { formatObservation, getExplanationForPath } from './util';

export const addInspectPath = (path: any) => {
  return {
    type: 'ADD_INSPECT_PATH',
    payload: path,
  };
};

export const changeSelectedPath = (path: any) => {
  return {
    type: 'CHANGE_SELECTED_PATH',
    payload: path,
  };
};

export const getPathwayData = (
  cellLine: any,
  perturbagen: any,
  substrate: any,
  onlyKinaseEnds: any
): any => async (dispatch: any) => {
  const pathwayRoute = '/pathway';
  const pathwayParams = { cellLine, perturbagen, substrate, onlyKinaseEnds };

  const observationRoute = '/observation';
  const observationParams = { perturbagen, cellLine };

  const [fullObservationData, pathwayResults] = await Promise.all([
    getApi(observationRoute, observationParams),
    getApi(pathwayRoute, pathwayParams),
  ]);

  const observationData = fullObservationData.map((row: any) =>
    pick(row, ['substrate', 'fold_change', 'p_value'])
  );

  const formattedObservation = formatObservation(
    pathwayResults.phosphosites,
    observationData
  );

  dispatch({
    type: 'GET_PATHWAY_DATA',
    payload: { observation: formattedObservation, ...pathwayResults },
  });
};

export const removeAllInspectPaths = () => {
  return {
    type: 'REMOVE_ALL_INSPECT_PATHS',
  };
};

export const setCxtMenu = (cxtMenu: any) => {
  return {
    type: 'SET_CXT_MENU',
    payload: cxtMenu,
  };
};

export const setCy = (cy: any) => {
  return {
    type: 'SET_CY',
    payload: cy,
  };
};

export const setElementsToAnimate = (elementsToAnimate: any) => {
  return {
    type: 'SET_ELEMENTS_TO_ANIMATE',
    payload: elementsToAnimate,
  };
};

export const setPathExplanation = (selectedPath: any) => {
  const data = store.getState().pathwayData || {
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
    type: 'SET_PATH_EXPLANATION',
    payload: pathDetails,
  };
};

export const setSelectedInputs = (inputs: any) => {
  return {
    type: 'SET_SELECTED_INPUTS',
    payload: inputs,
  };
};
