export default (state = { cellLine: '', perturbagen: '', substrate: '', onlyKinaseEnds: true }, action) => {
  switch (action.type) {
    case 'SET_SELECTED_INPUTS':
      return action.payload;
    default:
      return state;
  }
};
