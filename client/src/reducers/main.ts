import { uniqWith } from 'lodash';

export const extraSidebarRoutes = (state = [], action) => {
  const filterDuplicates = (type, itemName) =>
    uniqWith(
      [...state, { type, name: itemName }],
      (x, y) => x.type === y.type && x.name === y.name
    );

  switch (action.type) {
    case 'ADD_KINASE_SIDEBAR_ROUTE':
      return filterDuplicates('kinase', action.payload);
    case 'ADD_PERTURBAGEN_SIDEBAR_ROUTE':
      return filterDuplicates('perturbagen', action.payload);
    case 'REMOVE_SIDEBAR_ROUTE':
      return state.filter((e) => e.name !== action.payload);
    default:
      return state;
  }
};

export const selectedPerturbagen = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_PERTURBAGEN':
      return action.payload;
    default:
      return state;
  }
};

export const perturbagenData = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PERTURBAGEN_DATA':
      return action.payload;
    default:
      return state;
  }
};

export const currentPagePerturbagen = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PAGE_PERTURBAGEN':
      return action.payload;
    default:
      return state;
  }
};

export const kinaseData = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_KINASE_DATA':
      return action.payload;
    default:
      return state;
  }
};

export const currentPageKinase = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PAGE_KINASE':
      return action.payload;
    default:
      return state;
  }
};

export const selectedKinase = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_KINASE':
      return action.payload;
    default:
      return state;
  }
};
