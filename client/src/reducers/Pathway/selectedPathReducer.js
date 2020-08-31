export default (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_PATH':
      return action.payload;
    default:
      return state;
  }
};
