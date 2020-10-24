export default (elementsToAnimate) => {
  return {
    type: 'SET_ELEMENTS_TO_ANIMATE',
    payload: elementsToAnimate,
  };
};
