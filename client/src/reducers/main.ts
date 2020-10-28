/* eslint-disable import/prefer-default-export */
import { uniqWith } from 'lodash';

const addUniqueRoute = (state, type: string, name: string) =>
  uniqWith(
    [...state, { type, name }],
    (x, y) => x.type === y.type && x.name === y.name
  );

export const extraSidebarRoutes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SIDEBAR_ROUTE':
      return addUniqueRoute(state, action.payload.type, action.payload.name);
    case 'REMOVE_SIDEBAR_ROUTE':
      return state.filter((e) => e.name !== action.payload);
    default:
      return state;
  }
};
