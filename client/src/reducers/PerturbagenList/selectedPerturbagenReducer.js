export default (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_PERTURBAGEN':
      return action.payload;
    default:
      return state;
  }
};
