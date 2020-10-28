/// <reference types="react-scripts" />

declare module '*.PNG';

interface SidebarRoute {
  type: string;
  name: string;
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
