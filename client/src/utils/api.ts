import axios from 'axios';

interface Params {
  [key: string]: string | number | boolean;
}

export const fetchFromApi = async (route: string, params?: Params) => {
  try {
    const response = await axios.get(route, { params });
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};
