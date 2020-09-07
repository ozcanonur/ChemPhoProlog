import { getApi } from 'api/api';

const fetchPerturbagenData = (query) => async (dispatch) => {
  const route = '/getPerturbagenList';
  const response = await getApi(route);

  dispatch({ type: 'FETCH_PERTURBAGEN_DATA', payload: response });
};

export default fetchPerturbagenData;
