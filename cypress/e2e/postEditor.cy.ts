describe('Given an ADMIN new Post screen which loads an Editor component for content', () => {
  before(() => {
    cy.login()
    cy.visitAndCheck("/admin");
  });
  
  afterEach(() => {
    cy.cleanupUser();
  });

  describe('When user start typing the first time in the markdown content', () => {
    it('Then the right side should exist a preview', () => {
      cy.findByRole('link', { name: /Crear nueva/i}).click();
      cy.findByRole('textbox', { name: /markdown/i }).type('# Encabezado 1');
      

      cy.findByTestId('preview').should('contain', 'Encabezado 1');
    });
  });
})