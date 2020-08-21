import { CallApi } from 'api/api';

export const fetchPerturbagenData = (query) => async (dispatch) => {
  const response = await CallApi(query);

  dispatch({ type: 'FETCH_PERTURBAGEN_DATA', payload: response });
};
