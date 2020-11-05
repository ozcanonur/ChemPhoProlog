import { ACTION, AddSidebarRouteAction, RemoveSidebarRouteAction } from './types';

export const addSidebarRoute = (name: string): AddSidebarRouteAction => {
  return {
    type: ACTION.ADD_SIDEBAR_ROUTE,
    payload: name,
  };
};

export const removeSidebarRoute = (name: string): RemoveSidebarRouteAction => {
  return {
    type: ACTION.REMOVE_SIDEBAR_ROUTE,
    payload: name,
  };
};
