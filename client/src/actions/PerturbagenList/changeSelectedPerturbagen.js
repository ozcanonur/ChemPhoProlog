const changeSelectedPerturbagen = (selection) => {
  return {
    type: 'CHANGE_SELECTED_PERTURBAGEN',
    payload: selection,
  };
};

export default changeSelectedPerturbagen;
