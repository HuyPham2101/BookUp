import { userBuilder } from "../builder/User";

describe("LoginPage", () => {
  it("should render login Page", () => {
    cy.visit("/");
    cy.url().should("contain", "/login");
    cy.screenshot();
  });

  it("can move to RegisterPage", () => {
    cy.visit("/");
    cy.contains("Don't have an account? Sign Up").click()
    cy.url().should("contain", "/register");
  });

  it("can login", () => {
    cy.createUser({}).then((user) => {
      cy.visit("/login");
      cy.screenshot();
      cy.findByLabelText(/email/i).type(user.email);
      cy.findByLabelText(/password/i).type(user.password);
      cy.contains('Sign In').click();
      cy.url().should("contain", "/dashboard");
      cy.screenshot();
    });
  });
});
