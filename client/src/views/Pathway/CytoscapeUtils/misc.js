import { hideAll as hideTooltips } from 'tippy.js';

export const clearAllTimeouts = () => {
  for (let i = 0; i < 100000; i += 1) clearTimeout(i);
};

export const runLayout = (cy, layout) => {
  cy.layout(layout).run();
  cy.fit();
};

export const resetPathwayVisuals = (cy) => {
  // Remove the previous highlighting/tooltips if any
  hideTooltips();
  clearAllTimeouts();
  cy.elements().forEach((e) => {
    e.removeClass('highlightedKPaInhibited');
    e.removeClass('highlightedKPaActivated');
    e.removeClass('highlightedKPaConflicting');
    e.removeClass('highlightedPhosphosite');
    e.removeClass('highlightedKinaseEdge');
    e.removeClass('highlightedPhosphataseEdge');
    e.removeClass('fade');
  });
};
