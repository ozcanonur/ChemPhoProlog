export default (selection) => {
  return {
    type: 'CHANGE_SELECTED_KINASE',
    payload: selection,
  };
};
