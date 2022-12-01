import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /Registrate/i }).click();

    cy.findByRole("textbox", { name: /Correo electrónico/i }).type(
      loginForm.email
    );
    cy.findByLabelText(/Contraseña/i).type(loginForm.password);
    cy.findByRole("button", { name: /Crear cuenta/i }).click();
    cy.findByRole("button", { name: /Cerrar sesión/i }).click();
  });
});
