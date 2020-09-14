export default (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PAGE_PERTURBAGEN':
      return action.payload;
    default:
      return state;
  }
};
