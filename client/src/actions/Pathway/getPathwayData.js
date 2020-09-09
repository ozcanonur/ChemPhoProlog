import { getApi } from 'api/api';

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

const getPathwayData = (perturbagen, cell_line) => async (dispatch) => {
  const pathwayRoute = '/pathway';
  const observationRoute = '/getObservation';
  const observationParams = { perturbagen, cell_line, for: 'pathway' };

  const [fullObservationData, pathsResults] = await Promise.all([
    getApi(observationRoute, observationParams),
    getApi(pathwayRoute),
  ]);

  const formattedObservation = formatObservation(pathsResults.phosphosites, fullObservationData);

  dispatch({ type: 'GET_PATHWAY_DATA', payload: { observation: formattedObservation, ...pathsResults } });
};

export default getPathwayData;
