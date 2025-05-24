describe('Posts Page', () => {
  it('should load and display post titles', () => {
    cy.visit('/');
    cy.contains('Posts').should('exist');

    // Wait for data to load and validate post items are present
    cy.get('[data-testid="post-item"]').should('exist');
  });
});