const changeSelectedKinase = (selection) => {
  return {
    type: 'CHANGE_SELECTED_KINASE',
    payload: selection,
  };
};

export default changeSelectedKinase;
