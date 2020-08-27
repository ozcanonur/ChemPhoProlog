import { uniqWith } from 'lodash';

export default (state = [], action) => {
  const filterDuplicates = (type, itemName) =>
    uniqWith([...state, { type, name: itemName }], (x, y) => x.type === y.type && x.name === y.name);
  switch (action.type) {
    case 'ADD_KINASE_SIDEBAR_ROUTE':
      return filterDuplicates('kinase', action.payload);
    case 'ADD_PERTURBAGEN_SIDEBAR_ROUTE':
      return filterDuplicates('perturbagen', action.payload);
    case 'REMOVE_SIDEBAR_ROUTE':
      return state.filter((e) => e.name !== action.payload);
    default:
      return state;
  }
};
