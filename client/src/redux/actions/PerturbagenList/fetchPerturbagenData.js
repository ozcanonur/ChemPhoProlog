import { getApiWeb } from 'api/api';

export default () => async (dispatch) => {
  const route = '/getPerturbagenList';
  const response = await getApiWeb(route);

  dispatch({ type: 'FETCH_PERTURBAGEN_DATA', payload: response });
};
