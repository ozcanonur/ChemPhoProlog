import { CallApi } from 'api/api';

export const fetchKinaseData = (query) => async (dispatch) => {
  const response = await CallApi(query);

  dispatch({ type: 'FETCH_KINASE_DATA', payload: response });
};
