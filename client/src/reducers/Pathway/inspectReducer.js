import uniqWith from 'lodash/uniqWith';

export default (state = [], action) => {
  const filterDuplicates = () =>
    uniqWith([...state, action.payload], (x, y) => {
      const xId = x[0];
      const yId = y[0];
      return xId === yId;
    });

  switch (action.type) {
    case 'ADD_INSPECT_PATH':
      return filterDuplicates();
    case 'REMOVE_ALL_INSPECT_PATHS':
      return [];
    default:
      return state;
  }
};
