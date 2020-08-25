export const cytoStylesheet = () => [
  {
    selector: 'node',
    style: {
      content: 'data(id)',
      fontFamily: 'Roboto',
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'source-arrow-shape': 'triangle',
      width: 4,
      'line-color': '#ddd',
    },
  },
  {
    selector: '.phosphosite',
    style: {
      backgroundColor: 'orange',
      content: 'data(id)',
    },
  },
  {
    selector: '.KPa',
    style: {
      fontSize: 20,
    },
  },
  {
    selector: '.highlightedKPa',
    style: {
      backgroundColor: 'green',
      'background-opacity': 0.2,
    },
  },
  {
    selector: '.highlightedPhosphosite',
    style: {
      backgroundColor: 'green',
    },
  },
  {
    selector: '.highlightedKinaseEdge',
    style: {
      lineColor: 'green',
      lineStyle: 'dashed',
      'source-arrow-color': 'green',
    },
  },
  {
    selector: '.highlightedPhosphataseEdge',
    style: {
      lineColor: 'red',
      lineStyle: 'dashed',
      'source-arrow-color': 'red',
    },
  },
  {
    selector: '.fade',
    style: {
      'background-opacity': 0.6,
      opacity: 0.6,
    },
  },
];

export const cytoLayout = () => {
  return {
    name: 'cose-bilkent',
    quality: 'default',
    randomize: false,
    // Whether to include labels in node dimensions. Useful for avoiding label overlap
    nodeDimensionsIncludeLabels: true,
    // number of ticks per frame; higher is faster but more jerky
    refresh: 60,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: 100000,
    // Ideal (intra-graph) edge length
    idealEdgeLength: 50,
    // Divisor to compute edge forces
    edgeElasticity: 0.5,
    // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
    nestingFactor: 0.5,
    // Gravity force (constant)
    gravity: 0.25,
    // Maximum number of iterations to perform
    numIter: 2500,
    // Whether to tile disconnected nodes
    tile: true,
    // Type of layout animation. The option set is {'during', 'end', false}
    animate: true,
    // Duration for animate:end
    animationDuration: 300,
    // These paddings are space between nodes (phosphosites actually)
    tilingPaddingVertical: 5,
    tilingPaddingHorizontal: 5,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 0.1,
    // Gravity force (constant) for compounds
    gravityCompound: 0.9,
    // Gravity range (constant)
    gravityRange: 10,
    // Initial cooling factor for incremental layout
    initialEnergyOnIncremental: 0.5,
  };
};

export const cytoElements = (pathwayData) => {
  // KPas
  const nodes = Object.keys(pathwayData.relations).map((e) => {
    return { data: { id: e }, classes: ['KPa'] };
  });

  const phosphosites = pathwayData.phosphosites.map((e) => {
    return { data: { id: e, parent: e.split('(')[0] }, classes: ['phosphosite'] };
  });

  // Avoiding loops with indexOf, messes up the layout for some reason?
  const edges = Object.keys(pathwayData.relations)
    .map((key) =>
      pathwayData.relations[key]
        .filter((x) => x.indexOf(key) === -1)
        .map((e) => {
          return { data: { id: `${key}to${e}`, source: key, target: e } };
        })
    )
    .flat();

  return [...nodes, ...phosphosites, ...edges];
};
