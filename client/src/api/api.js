import axios from 'axios';

const CallApi = async (query) => {
  const response = await axios.get('/api/api', {
    params: {
      query: query,
    },
  });

  const body = await response.data;

  if (response.status !== 200) throw Error(response.statusText);

  return body;
};

export default CallApi;
