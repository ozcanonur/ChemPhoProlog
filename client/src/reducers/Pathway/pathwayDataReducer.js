export default (
  state = { paths: [], relations: {}, phosphosites: [], regulatory: {}, stoppingReasons: {}, observation: {} },
  action
) => {
  switch (action.type) {
    case 'GET_PATHWAY_DATA':
      return action.payload;
    default:
      return state;
  }
};
