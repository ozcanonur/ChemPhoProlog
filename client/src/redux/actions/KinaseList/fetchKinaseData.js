import { getApiWeb } from 'api/api';

export default () => async (dispatch) => {
  const route = '/getKinaseList';
  const response = await getApiWeb(route);

  dispatch({ type: 'FETCH_KINASE_DATA', payload: response });
};
