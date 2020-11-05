/* eslint-disable import/prefer-default-export */
import { ACTION, AddSidebarRouteAction, RemoveSidebarRouteAction } from 'actions/types';

const addUniqueRoute = (state: string[], name: string) => {
  if (!state.includes(name)) state.push(name);
  return [...state];
};

export const extraSidebarRoutes = (state: string[] = [], action: AddSidebarRouteAction | RemoveSidebarRouteAction) => {
  switch (action.type) {
    case ACTION.ADD_SIDEBAR_ROUTE:
      return addUniqueRoute(state, action.payload);
    case ACTION.REMOVE_SIDEBAR_ROUTE:
      return state.filter((e) => e !== action.payload);
    default:
      return state;
  }
};
