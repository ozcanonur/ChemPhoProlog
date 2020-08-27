const removeSidebarRoute = (item) => {
  return {
    type: 'REMOVE_SIDEBAR_ROUTE',
    payload: item,
  };
};

export default removeSidebarRoute;
