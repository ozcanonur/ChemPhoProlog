export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_KINASE_DATA':
      return action.payload;
    default:
      return state;
  }
};
