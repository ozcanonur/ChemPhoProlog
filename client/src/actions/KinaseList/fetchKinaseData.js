import { getApi } from 'api/api';

const fetchKinaseData = (query) => async (dispatch) => {
  const route = '/getKinaseList';
  const response = await getApi(route);

  dispatch({ type: 'FETCH_KINASE_DATA', payload: response });
};

export default fetchKinaseData;
