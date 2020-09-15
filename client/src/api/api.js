import axios from 'axios';

export const getApiWeb = async (route, params) => {
  const response = await axios.get(`/apiWeb${route}`, {
    params,
  });

  if (response.status !== 200) throw Error(response.statusText);
  return response.data;
};

export const getApi = async (route, params) => {
  const response = await axios.get(`/api${route}`, {
    params,
  });

  if (response.status !== 200) throw Error(response.statusText);
  return response.data;
};
