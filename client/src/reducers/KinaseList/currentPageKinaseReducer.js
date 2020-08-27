export default (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PAGE_KINASE':
      return action.payload;
    default:
      return state;
  }
};
