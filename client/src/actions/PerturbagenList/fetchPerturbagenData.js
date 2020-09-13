import { getApi } from 'api/api';

export default () => async (dispatch) => {
  const route = '/getPerturbagenList';
  const response = await getApi(route);

  dispatch({ type: 'FETCH_PERTURBAGEN_DATA', payload: response });
};
