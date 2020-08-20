import { CallApi } from 'api/api';

export const fetchKinaseData = () => async (dispatch) => {
  const query = 'select * from Protein where kinase_name <> "" order by kinase_name';
  const response = await CallApi(query);

  dispatch({ type: 'FETCH_KINASE_DATA', payload: response });
};
