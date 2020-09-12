export const getCytoStylesheet = (observation, regulatory, start) => [
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
      'target-arrow-shape': 'triangle',
      width: 4,
      'line-color': '#ddd',
      'curve-style': 'unbundled-bezier',
    },
  },
  {
    selector: '.phosphosite',
    style: {
      content: 'data(id)',
      backgroundColor: (e) => (e.data().id === start ? '#2D4159' : '#e5ad06'),
      width: (e) => (e.data().id === start ? 60 : 30),
      height: (e) => (e.data().id === start ? 60 : 30),
    },
  },
  {
    selector: '.KPa',
    style: {
      fontSize: 20,
      'compound-sizing-wrt-labels': 'include',
    },
  },
  {
    selector: '.highlightedKPaInhibited',
    style: {
      backgroundColor: 'green',
      'background-opacity': 0.2,
    },
  },
  {
    selector: '.highlightedKPaActivated',
    style: {
      backgroundColor: '#FE7272',
      'background-opacity': 0.2,
    },
  },
  {
    selector: '.highlightedKPaConflicting',
    style: {
      backgroundColor: '#505050',
      'background-opacity': 0.2,
    },
  },
  {
    selector: '.highlightedPhosphosite',
    style: {
      backgroundColor: (e) => (observation[e.data().id].fold_change > 0 ? 'red' : 'green'),
      'border-width': 10,
      'border-style': 'dashed',
      'border-color': (e) => {
        const reg = regulatory[e.data().id];
        if (reg === 'p_inc') return '#006400';
        if (reg === 'p_dec') return '#650000';
        return '#505050';
      },
      width: 40,
      height: 40,
      'transition-property': 'width height border-width',
      'transition-duration': '0.2s',
      'transition-timing-function': 'ease-out',
    },
  },
  {
    selector: '.highlightedKinaseEdge',
    style: {
      lineColor: 'green',
      lineStyle: 'dashed',
      'target-arrow-color': 'green',
      'arrow-scale': 2,
    },
  },
  {
    selector: '.highlightedPhosphataseEdge',
    style: {
      lineColor: 'red',
      lineStyle: 'dashed',
      'target-arrow-color': 'red',
      'arrow-scale': 2,
    },
  },
  {
    selector: '.fade',
    style: {
      'background-opacity': 0.5,
      opacity: 0.5,
    },
  },
];

export const getCytoLayout = () => {
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
    idealEdgeLength: 20,
    // Divisor to compute edge forces
    edgeElasticity: 0.1,
    // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
    nestingFactor: 0.5,
    // Gravity force (constant)
    gravity: 0.1,
    // Maximum number of iterations to perform
    numIter: 2500,
    // Whether to tile disconnected nodes
    tile: true,
    // Type of layout animation. The option set is {'during', 'end', false}
    animate: true,
    // Duration for animate:end
    animationDuration: 700,
    // These paddings are space between nodes (phosphosites actually)
    tilingPaddingVertical: 20,
    tilingPaddingHorizontal: 10,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 0.1,
    // Gravity force (constant) for compounds
    gravityCompound: 0.9,
    // Gravity range (constant)
    gravityRange: 3,
    // Initial cooling factor for incremental layout
    initialEnergyOnIncremental: 0.5,
  };
};

export const getCytoElements = (data) => {
  // KPas
  const nodes = Object.keys(data.relations).map((e) => {
    return { data: { id: e }, classes: ['KPa'] };
  });

  const phosphosites = data.phosphosites.map((e) => {
    return {
      data: { id: e, parent: e.split('(')[0] },
      classes: ['phosphosite'],
    };
  });

  // Avoiding loops with indexOf, messes up the layout for some reason?
  const edges = Object.keys(data.relations)
    .map((key) =>
      data.relations[key]
        .filter((x) => x.indexOf(key) === -1)
        .map((e) => {
          return {
            data: { id: `${key}to${e}`, source: key, target: e },
            selectable: false,
            grabbable: false,
            pannable: false,
          };
        })
    )
    .flat();

  return [...nodes, ...phosphosites, ...edges];
};
