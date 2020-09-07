import axios from 'axios';

export const getApi = async (route, params) => {
  const response = await axios.get(`/api${route}`, {
    params,
  });

  if (response.status !== 200) throw Error(response.statusText);
  return response.data;
};
