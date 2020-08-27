import axios from 'axios';

export const CallApi = async (query) => {
  const response = await axios.get('/api/api', {
    params: {
      query,
    },
  });

  const body = await response.data;

  if (response.status !== 200) throw Error(response.statusText);

  return body;
};

export const CallApiForProteinSubstrates = async (protein) => {
  const response = await axios.get('/api/substrates_for_protein', {
    params: {
      protein,
    },
  });

  if (response.status !== 200) throw Error(response.statusText);

  return response.data;
};

export const CallApiForPDTs = async (kinase, cell_line) => {
  const response = await axios.get('/api/pdts/', {
    params: {
      kinase,
      cell_line,
    },
  });

  if (response.status !== 200) throw Error(response.statusText);

  return response.data;
};

export const CallApiForPathway = async () => {
  const response = await axios.get('/api/pathway');

  if (response.status !== 200) throw Error(response.statusText);

  return response.data;
};
