export default (state = null, action) => {
  switch (action.type) {
    case 'SET_CXT_MENU':
      return action.payload;
    default:
      return state;
  }
};
