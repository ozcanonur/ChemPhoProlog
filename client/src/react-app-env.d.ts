/// <reference types="react-scripts" />

declare module '*.png';
declare module '*.jpg';
declare module '*.gif';

interface SidebarRoute {
  type: string;
  name: string;
}

interface Route {
  path: string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  component: () => JSX.Element;
}

interface Kinase {
  description?: string;
  expressed_in: string;
  families?: string;
  gene_name?: string;
  gene_synonyms?: string;
  kinase_name: string;
  length?: number;
  sequence?: string;
  uniprot_id: string;
  uniprot_name?: string;
}

interface Perturbagen {
  action: string;
  chemspider_id: string;
  name: string;
  synonyms: string;
}

interface Observation {
  cell_line: string;
  cv?: number;
  fold_change: number;
  p_value?: number;
  perturbagen: string;
  substrate: string;
}

interface RootState {
  extraSidebarRoutes: SidebarRoute[];
  // pathways
  pathsInspectList: any;
  selectedPath: any;
  pathwayData: any;
  pathwayInputs: any;
  cy: any;
  elementsToAnimate: any;
  cxtMenu: any;
  pathExplanation: any;
}
