/// <reference types="react-scripts" />

declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module 'cytoscape-cose-bilkent';
declare module 'cytoscape-popper';
declare module 'cytoscape-cxtmenu';

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

namespace Pathway {
  interface PathwayObservation {
    [substrate: string]: { fold_change: string; p_value: string };
  }
  type Paths = string[][];
  type Phosphosites = string[];
  type Regulatory = { [substrate: string]: string };
  type Relations = { [Kpa: string]: string[] };
  type StoppingReasons = { [node: string]: string };

  interface PathwayData {
    observation: PathwayObservation;
    paths: Paths;
    phosphosites: Phosphosites;
    regulatory: Regulatory;
    relations: Relations;
    stoppingReasons: StoppingReasons;
  }
}

interface RootState {
  extraSidebarRoutes: SidebarRoute[];
  // pathways
  pathsInspectList: string[][];
  selectedPath: any;
  pathwayData: Pathway.PathwayData;
  pathwayInputs: any;
  cy: import('cytoscape').Core | null;
  elementsToAnimate: any;
  cxtMenu: any;
  pathExplanation: any;
}
