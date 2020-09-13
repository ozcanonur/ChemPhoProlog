export default (state = null, action) => {
  switch (action.type) {
    case 'SET_CY':
      return action.payload;
    default:
      return state;
  }
};
