/* eslint-disable import/prefer-default-export */
import { uniqWith } from 'lodash';
import { ACTION, AddSidebarRouteAction, RemoveSidebarRouteAction } from 'actions/types';

const addUniqueRoute = (state: SidebarRoute[], name: string) => uniqWith([...state, { name }], (x, y) => x.name === y.name);

export const extraSidebarRoutes = (
  state: SidebarRoute[] = [],
  action: AddSidebarRouteAction | RemoveSidebarRouteAction
): SidebarRoute[] => {
  switch (action.type) {
    case ACTION.ADD_SIDEBAR_ROUTE:
      return addUniqueRoute(state, action.payload.name);
    case ACTION.REMOVE_SIDEBAR_ROUTE:
      return state.filter((e) => e.name !== action.payload.name);
    default:
      return state;
  }
};
