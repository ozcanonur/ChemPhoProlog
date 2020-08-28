import uniqWith from 'lodash/uniqWith';

export default (state = [], action) => {
  const filterDuplicates = () => uniqWith([...state, action.payload], (x, y) => x === y);

  switch (action.type) {
    case 'ADD_INSPECT_PATH':
      return filterDuplicates();
    default:
      return state;
  }
};
