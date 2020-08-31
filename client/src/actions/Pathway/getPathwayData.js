import { CallApi, CallApiForPaths } from 'api/api';

const formatObservation = (phosphosites, fullObservationData) => {
  const observationInCurrentPaths = fullObservationData.filter((e) => phosphosites.includes(e.substrate));

  const formattedObservation = {};
  // eslint-disable-next-line camelcase
  observationInCurrentPaths.forEach(({ substrate, fold_change, p_value }) => {
    formattedObservation[substrate] = {
      fold_change: fold_change.toFixed(2),
      p_value: p_value.toFixed(2),
    };
  });

  return formattedObservation;
};

const getPathwayData = (perturbagen, cellLine) => async (dispatch) => {
  const observationQuery = `select substrate, fold_change, p_value from observation where perturbagen="${perturbagen}" and cell_line="${cellLine}"`;
  const [fullObservationData, pathsResults] = await Promise.all([CallApi(observationQuery), CallApiForPaths()]);

  const formattedObservation = formatObservation(pathsResults.phosphosites, fullObservationData);

  dispatch({ type: 'GET_PATHWAY_DATA', payload: { observation: formattedObservation, ...pathsResults } });
};

export default getPathwayData;
