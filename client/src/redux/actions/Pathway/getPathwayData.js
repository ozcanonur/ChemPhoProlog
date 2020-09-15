import { getApi } from 'api/api';
import pick from 'lodash/pick';

const formatObservation = (phosphosites, observationData) => {
  const observationInCurrentPaths = observationData.filter((e) => phosphosites.includes(e.substrate));

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

export default (cell_line, perturbagen, substrate, onlyKinaseEnds) => async (dispatch) => {
  const pathwayRoute = '/pathway';
  const pathwayParams = { cell_line, perturbagen, substrate, onlyKinaseEnds };

  const observationRoute = '/observation';
  const observationParams = { perturbagen, cell_line };

  const [fullObservationData, pathwayResults] = await Promise.all([
    getApi(observationRoute, observationParams),
    getApi(pathwayRoute, pathwayParams),
  ]);

  const observationData = fullObservationData.map((row) =>
    pick(row, ['substrate', 'fold_change', 'p_value'])
  );
  const formattedObservation = formatObservation(pathwayResults.phosphosites, observationData);

  dispatch({ type: 'GET_PATHWAY_DATA', payload: { observation: formattedObservation, ...pathwayResults } });
};
