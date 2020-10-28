import axios from 'axios';

interface Params {
  [key: string]: string;
}

export const getApiWeb = async (route: string, params?: Params) => {
  const response = await axios.get(`/apiWeb${route}`, {
    params,
  });

  if (response.status !== 200) throw Error(response.statusText);
  return response.data;
};

export const getApi = async (route: string, params?: Params) => {
  const response = await axios.get(`/api${route}`, {
    params,
  });

  if (response.status !== 200) throw Error(response.statusText);
  return response.data;
};
