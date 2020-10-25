/// <reference types="react-scripts" />

declare module '*.PNG';

interface SidebarRoute {
  type: string;
  name: string;
}

interface RootState {
  kinaseData: any;
  selectedKinase: string;
  currentPageKinase: number;
  perturbagenData: any;
  selectedPerturbagen: string;
  currentPagePerturbagen: number;
  extraSidebarRoutes: SidebarRoute[];
  // pathways
  pathsInspectList: inspectList;
  selectedPath: any;
  pathwayData: any;
  pathwayInputs: any;
  cy: any;
  elementsToAnimate: any;
  cxtMenu: any;
  pathExplanation: any;
}
