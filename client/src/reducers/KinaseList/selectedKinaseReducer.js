export default (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_KINASE':
      return action.payload;
    default:
      return state;
  }
};
