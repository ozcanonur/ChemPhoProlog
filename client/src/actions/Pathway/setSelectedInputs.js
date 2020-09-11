const setSelectedInputs = (inputs) => {
  return {
    type: 'SET_SELECTED_INPUTS',
    payload: inputs,
  };
};

export default setSelectedInputs;
