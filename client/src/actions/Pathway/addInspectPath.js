const addInspectPath = (path) => {
  return {
    type: 'ADD_INSPECT_PATH',
    payload: path,
  };
};

export default addInspectPath;
