import { CallApi } from 'api/api';

const fetchPerturbagenData = (query) => async (dispatch) => {
  const response = await CallApi(query);

  dispatch({ type: 'FETCH_PERTURBAGEN_DATA', payload: response });
};

export default fetchPerturbagenData;
