import Cytoscape from 'cytoscape';

export default (
  state = {
    elementsToShow: Cytoscape().collection(),
    elementsToFade: Cytoscape().collection(),
  },
  action
) => {
  switch (action.type) {
    case 'SET_ELEMENTS_TO_ANIMATE':
      return action.payload;
    default:
      return state;
  }
};
