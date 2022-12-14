describe('When user visits admin/index page', () => {
  before(() => {
    cy.login();
    cy.visitAndCheck("/admin");
  });

  afterEach(() => {
    cy.cleanupUser();
  });

  it('Then a list of summary posts should be shown', () => {
    cy.findByTestId('post-list').should('be.visible');
    cy.findAllByTestId('post-item').should('have.length.gt', 0);
  });
});