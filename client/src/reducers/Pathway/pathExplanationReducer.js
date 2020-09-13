export default (state = [], action) => {
  switch (action.type) {
    case 'SET_PATH_EXPLANATION':
      return action.payload;
    default:
      return state;
  }
};
