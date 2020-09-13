import { store } from 'store';

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
      width: (e) => (e.data().id === start ? 60 : 30),
      height: (e) => (e.data().id === start ? 60 : 30),
      backgroundColor: (e) => {
        if (e.data().id === start) {
          const fc = parseFloat(observation[e.data().id].fold_change, 10);
          if (fc < 0) return '#006400';
          if (fc > 0) return '#650000';
        }
        return '#e5ad06';
      },
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
    quality: 'proof',
    randomize: false,
    fit: true,
    padding: 30,
    // Whether to include labels in node dimensions. Useful for avoiding label overlap
    nodeDimensionsIncludeLabels: true,
    // number of ticks per frame; higher is faster but more jerky
    refresh: 60,
    // Node repulsion (non overlapping) multiplier. CRITICAL for different layouts
    nodeRepulsion: 1000000,
    // Ideal (intra-graph) edge length
    idealEdgeLength: 20,
    // Divisor to compute edge forces
    edgeElasticity: 0.1,
    // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
    nestingFactor: 0.5,
    // Gravity force (constant) Higher makes nodes TOO FAR APART, lower makes compounds too large
    gravity: 0.1,
    // Maximum number of iterations to perform.
    // Makes layout far better with more iterations, but also far slower. 2500 is default, 10000 feels acceptable
    numIter: 10000,
    // Makes nodes that don't have edges (phosphosites inside KPas) spread out in compound
    tile: true,
    // Type of layout animation.
    // The option set is {'during', 'end', false}. During is quite funny
    animate: false,
    // Duration for animate:end
    animationDuration: 100,
    // These paddings are space between nodes (phosphosites actually)
    tilingPaddingVertical: 20,
    tilingPaddingHorizontal: 10,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 0.1,
    // Gravity force (constant) for compounds
    gravityCompound: 3,
    // Gravity range (constant)
    gravityRange: 1,
    // Initial cooling factor for incremental layout
    initialEnergyOnIncremental: 0.1,
    // Called on `layoutready`
    ready: () => {},
    // Called on `layoutstop`
    stop: () => {},
  };
};

export const getCytoElements = (data) => {
  // KPas
  const nodes = Object.keys(data.relations).map((e) => {
    return { data: { id: e }, classes: ['KPa'], selectable: false };
  });

  // Need to put the start node OUTSIDE a compound or the diff() in Cytoscape-react messes up
  // It removes the compound, so the children also gets devoured
  // Other phosphosites will ALWAYS be a part of a KPa (=compound), so it only matters for the start
  const start = store.getState().pathwayInputs.substrate;
  const phosphosites = data.phosphosites.map((e) => {
    return {
      data: { id: e, parent: e !== start ? e.split('(')[0] : undefined },
      classes: ['phosphosite'],
      selectable: false,
    };
  });

  // Avoiding self phosphorylation nodes with indexOf, messes up the layout for some reason?
  // Add them as KPa > KPa though, KPa > self phosphosite doesn't work.
  const edges = Object.keys(data.relations)
    .map((key) => {
      return data.relations[key].map((e) => {
        const id = e.indexOf(key) !== -1 ? `${key}to${key}` : `${key}to${e}`;
        const target = e.indexOf(key) !== -1 ? key : e;

        return {
          data: { id, source: key, target },
          selectable: false,
          grabbable: false,
          pannable: false,
        };
      });
    })
    .flat();

  return [...nodes, ...phosphosites, ...edges];
};
