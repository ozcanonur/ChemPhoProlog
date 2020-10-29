export const addSidebarRoute = (type: string, name: string) => {
  return {
    type: 'ADD_SIDEBAR_ROUTE',
    payload: { type, name },
  };
};

export const removeSidebarRoute = (name: string) => {
  return {
    type: 'REMOVE_SIDEBAR_ROUTE',
    payload: name,
  };
};
