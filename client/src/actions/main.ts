import { getApiWeb } from 'api/api';

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

export const removeSidebarRoute = (item) => {
  return {
    type: 'REMOVE_SIDEBAR_ROUTE',
    payload: item,
  };
};

export const changeCurrentPagePerturbagen = (page) => {
  return {
    type: 'CHANGE_CURRENT_PAGE_PERTURBAGEN',
    payload: page,
  };
};

export const changeSelectedPerturbagen = (selection) => {
  return {
    type: 'CHANGE_SELECTED_PERTURBAGEN',
    payload: selection,
  };
};

export const fetchPerturbagenData = () => async (dispatch) => {
  const route = '/getPerturbagenList';
  const response = await getApiWeb(route);

  dispatch({ type: 'FETCH_PERTURBAGEN_DATA', payload: response });
};

export const changeCurrentPageKinase = (page) => {
  return {
    type: 'CHANGE_CURRENT_PAGE_KINASE',
    payload: page,
  };
};

export const changeSelectedKinase = (selection) => {
  return {
    type: 'CHANGE_SELECTED_KINASE',
    payload: selection,
  };
};

export const fetchKinaseData = () => async (dispatch) => {
  const route = '/getKinaseList';
  const response = await getApiWeb(route);

  dispatch({ type: 'FETCH_KINASE_DATA', payload: response });
};
