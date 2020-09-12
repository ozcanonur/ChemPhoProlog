export default (state = null, action) => {
  switch (action.type) {
    case 'GET_PATHWAY_DATA':
      return action.payload;
    case 'CLEAR_PATHWAY_DATA':
      return {
        paths: [],
        relations: {},
        phosphosites: [],
        regulatory: {},
        stoppingReasons: {},
        observation: {},
      };
    default:
      return state;
  }
};
