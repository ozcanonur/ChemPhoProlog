export const addSidebarRoute = (type: string, name: string) => {
  return {
    type: 'ADD_SIDEBAR_ROUTE',
    payload: { type, name },
  };
};

export const addSidebarKinase = (kinase) => {
  return {
    type: 'ADD_KINASE_SIDEBAR_ROUTE',
    payload: kinase,
  };
};

export const addSidebarPerturbagen = (perturbagen) => {
  return {
    type: 'ADD_PERTURBAGEN_SIDEBAR_ROUTE',
    payload: perturbagen,
  };
};

export const removeSidebarRoute = (name: string) => {
  return {
    type: 'REMOVE_SIDEBAR_ROUTE',
    payload: name,
  };
};
