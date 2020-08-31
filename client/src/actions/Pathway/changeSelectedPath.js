const changeSelectedPath = (path) => {
  return {
    type: 'CHANGE_SELECTED_PATH',
    payload: path,
  };
};

export default changeSelectedPath;
