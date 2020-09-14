import getApi from 'api/api';

export default () => async (dispatch) => {
  const route = '/getKinaseList';
  const response = await getApi(route);

  dispatch({ type: 'FETCH_KINASE_DATA', payload: response });
};
