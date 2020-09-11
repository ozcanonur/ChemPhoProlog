export default (state = null, action) => {
  switch (action.type) {
    case 'GET_PATHWAY_DATA':
      return action.payload;
    default:
      return state;
  }
};
