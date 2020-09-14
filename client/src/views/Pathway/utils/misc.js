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

export const addResizeEventListener = (cy, layout) => {
  let width = cy.width();
  let height = cy.height();
  cy.on('resize', (evt) => {
    const widthChange = Math.abs(evt.target.width() - width);
    const heightChange = Math.abs(evt.target.height() - height);

    // Only run layout again when resize is more than 30px
    const sizeChanged = widthChange > 30 || heightChange > 30;
    if (sizeChanged) runLayout(cy, layout);

    width = evt.target.width();
    height = evt.target.height();
  });
};