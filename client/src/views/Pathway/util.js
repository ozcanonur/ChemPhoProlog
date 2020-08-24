export const runLayout = (cy, layout) => {
  cy.on('resize', (_evt) => {
    cy.layout(layout).run();
    cy.fit();
  });
};
