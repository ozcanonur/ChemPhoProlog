import { ACTION, AddSidebarRouteAction, RemoveSidebarRouteAction } from './types';

export const addSidebarRoute = (type: string, name: string): AddSidebarRouteAction => {
  return {
    type: ACTION.ADD_SIDEBAR_ROUTE,
    payload: { type, name },
  };
};

export const removeSidebarRoute = (name: string): RemoveSidebarRouteAction => {
  return {
    type: ACTION.REMOVE_SIDEBAR_ROUTE,
    payload: { name },
  };
};
