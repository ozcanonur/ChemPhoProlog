export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PERTURBAGEN_DATA':
      return action.payload;
    default:
      return state;
  }
};
