export default (path) => {
  return {
    type: 'CHANGE_SELECTED_PATH',
    payload: path,
  };
};
