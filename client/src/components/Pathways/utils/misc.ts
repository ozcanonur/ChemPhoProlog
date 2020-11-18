import { hideAll as hideTooltips } from 'tippy.js';
import { Core, LayoutOptions } from 'cytoscape';

export const clearAllTimeouts = () => {
  for (let i = 0; i < 100000; i += 1) clearTimeout(i);
};

export const runLayout = (cy: Core | null, layout: LayoutOptions) => {
  if (!cy) return;

  cy.layout(layout).run();
  cy.fit();
};

export const resetPathwayVisuals = (cy: Core | null): void => {
  if (!cy) return;
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

export const addResizeEventListener = (cy: Core | null, layout: LayoutOptions) => {
  if (!cy) return;
  let width = cy.width();
  let height = cy.height();
  cy.on('resize', (evt) => {
    const widthChange = Math.abs(evt.target.width() - width);
    const heightChange = Math.abs(evt.target.height() - height);

    // Only run layout again when resize is more than 30px
    const sizeChanged = widthChange > 50 || heightChange > 50;
    if (sizeChanged) runLayout(cy, layout);

    width = evt.target.width();
    height = evt.target.height();
  });
};

export const fadeTooltipsOnScroll = () => {
  const mainPanel = document.getElementById('mainPanel');
  if (!mainPanel) return;

  const tooltips = document.getElementsByClassName('tippy-tooltip') as HTMLCollectionOf<HTMLElement>;

  for (let i = 0; i < tooltips.length; i += 1) {
    const tooltip = tooltips[i];
    tooltip.style.display = mainPanel.scrollTop < 1000 ? 'inherit' : 'none';
  }
};
