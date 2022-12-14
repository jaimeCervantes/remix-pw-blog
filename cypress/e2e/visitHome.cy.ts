describe('When user visits home/index page', () => {
  it('Then a welcome list of questions in form of code is shown', () => {
    cy.visit('/');
    cy.findByTestId('window-questions').should('be.visible');
  });
});